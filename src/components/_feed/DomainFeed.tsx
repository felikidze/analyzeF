import {FC, useLayoutEffect, useState} from 'react';

import {BaseClient} from '@components/context/AuthContext';

import {Card, Space} from 'antd';
import DomainChart from "@components/_feed/Item/DomainChart.tsx";

const Feed: FC = () => {
    const [domains, setDomains] = useState<Record<string, Record<string, number>>>({});

    useLayoutEffect(() => {
        const fetchData = async () => {
            const response: unknown[] = await BaseClient.get('/domains/get-data');
            setDomains(response.data);
        };

        fetchData();
    }, []);

    return (
        <Space direction="vertical" size={16}>
            {Object.entries(domains).map((domain) => (
                <Card title={domain[0]}>
                    <DomainChart title={domain[0]} item={domain[1]} />
                </Card>
            ))}
      </Space>
    )
};

export default Feed;