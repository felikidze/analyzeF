import {FC, useCallback} from 'react';
import {ValidateErrorEntity} from "rc-field-form/lib/interface";

import {BaseClient} from '@components/context/AuthContext';
import {Button, Form, Input} from "antd";

type FieldType = {
  url?: string;
};

interface IParserPage {

}

const ParserPage: FC<IParserPage> = () => {
    const onFinish = useCallback(({url}: Required<FieldType>) => {
        BaseClient.post('/parse/analyze', {
            data: {
                url
            }
        })
    }, []);
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
              label="url"
              name="url"
              rules={[{ required: true, message: 'Please input your url!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
        </Form>
    );
};

export default ParserPage;