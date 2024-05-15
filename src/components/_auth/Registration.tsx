import {FC, useCallback, useContext, useEffect} from 'react';
import { Button, Form, Input } from 'antd';
import {useNavigate} from "react-router-dom";
import {ValidateErrorEntity} from "rc-field-form/lib/interface";

import {RoutePath} from '@router/config/routeConfig';
import {AuthContext} from '@context/AuthContext';
import {UserRole} from '@components/entities/User/index';

type FieldType = {
  userName?: string;
  password?: string;
  email?: string;
};

const Registration: FC = () => {
    const {handleSignUp, isUserLogged} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserLogged) {
            navigate(RoutePath.parser_page)
        }
    }, [navigate, isUserLogged])

    const onFinish = useCallback(({userName, password, email}: Required<FieldType>) => {
        handleSignUp?.({
            userName,
            password,
            email,
            role: UserRole.USER
        });
    }, [handleSignUp]);
    const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
      console.log('Failed:', errorInfo);
    };

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

            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
        </Form>
    )
};

export default Registration;