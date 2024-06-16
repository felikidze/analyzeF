import {FC, useCallback, useState} from 'react';
import {ValidateErrorEntity} from "rc-field-form/lib/interface";

import {BaseClient} from '@components/context/AuthContext';
import {Button, Form, Input, Switch, Space} from "antd";

type FieldType = {
  url?: string;
};

interface IParserPage {

}

const ParserPage: FC<IParserPage> = () => {
    const [isDomainMode, setIsDomainMode] = useState(false);

    const onFinish = useCallback(({url}: Required<FieldType>) => {
        const scanModeRoute = isDomainMode ? '/parse/analyze-domain' : '/parse/analyze';

        BaseClient.post(scanModeRoute, {
            data: {
                url
            }
        })
    }, [isDomainMode]);
    const onFinishFailed = useCallback((errorInfo: ValidateErrorEntity) => {
      console.log('Failed:', errorInfo);
    }, []);
    const onDomainSwitchChange = useCallback((newValue: boolean) => {
        setIsDomainMode(newValue)
    }, []);

    return (
        <Space direction="vertical" size={16} style={{display: "flex", flexDirection: "column"}}>
            <div style={{display: "flex", justifyContent: 'flex-end', alignItems: "center"}}>
                <Switch
                    value={isDomainMode}
                    onChange={onDomainSwitchChange}
                />
                <div style={{marginLeft: "12px"}}>Domain mode</div>
            </div>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
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
        </Space>

    );
};

export default ParserPage;