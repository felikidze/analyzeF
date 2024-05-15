import {FC, useCallback, useContext, useEffect} from 'react';
import {AuthContext} from "@context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "@router/config/routeConfig.tsx";
import {ValidateErrorEntity} from "rc-field-form/lib/interface";
import {Button, Form, Input} from "antd";

type FieldType = {
  userName?: string;
  password?: string;
};

const Login: FC = () => {
    const {handleSignIn, isUserLogged} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserLogged) {
            navigate(RoutePath.parser_page)
        }
    }, [navigate, isUserLogged])

    const onFinish = useCallback(({userName, password}: Required<FieldType>) => {
        handleSignIn?.({
            userName,
            password
        });
    }, [handleSignIn]);
    const onFinishFailed = useCallback((errorInfo: ValidateErrorEntity) => {
      console.log('Failed:', errorInfo);
    }, []);

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
              label="Username"
              name="userName"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
        </Form>
    )
};

export default Login;