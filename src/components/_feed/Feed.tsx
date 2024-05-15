import {FC, useLayoutEffect, useState} from 'react';

import {BaseClient} from '@components/context/AuthContext';
import {Tag, Card, Space} from 'antd';


const Feed: FC = () => {
    const [feed, setFeed] = useState<unknown[]>([]);

    useLayoutEffect(() => {
        const fetchData = async () => {
            const response: unknown[] = await BaseClient.get('/scans/get-data');
            setFeed(response.data);
        };

        fetchData();
    }, []);

    return (
        <Space direction="vertical" size={16}>
            {feed.map((item) => {
                return (
                    <Card key={item!.id} title={item.url} style={{ width: 600 }}>
                        <Space style={{width: "100%"}} direction="vertical" size={8}>
                            {Object.entries(JSON.parse(item.description)).map(([key, value]) => {
                                return (<div style={{overflowWrap: "break-word"}}>{key}: {value}</div>)
                            })}
                            <div>Есть запрещенный контент: {item.result+''}</div>
                            <div>
                                Категория: <Tag color={item.tag.color}>{item.tag.name}</Tag>
                            </div>
                        </Space>
                    </Card>
                )
            })}
      </Space>
    )
};

export default Feed;