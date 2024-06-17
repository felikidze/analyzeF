import {FC, useCallback, useLayoutEffect, useState} from 'react';

import {BaseClient} from '@components/context/AuthContext';

import {Card, Space, Button, Drawer} from 'antd';
import DomainChart from "@components/_feed/Item/DomainChart";
import Reviews from "@components/_reviews/Reviews";

const DomainFeed: FC = () => {
    const [domains, setDomains] = useState<Record<string, Record<string, number>>>({});
    const [isReviewOpened, setIsReviewOpened] = useState(false);

    useLayoutEffect(() => {
        const fetchData = async () => {
            const response: unknown[] = await BaseClient.get('/domains/get-data');
            setDomains(response.data);
        };

        fetchData();
    }, []);

    const onReviewBtnClick = useCallback(() => {
        setIsReviewOpened(true);
    }, []);

    const onDrawerClose = useCallback(() => {
        setIsReviewOpened(false);
    }, []);

    return (
        <Space direction="vertical" size={16}>
            {Object.entries(domains).map((domain) => (
                <Card title={domain[0]}>
                    <DomainChart title={domain[0]} item={domain[1]} />
                    <Button
                        type="primary"
                        onClick={onReviewBtnClick}
                    >
                        Отзывы
                    </Button>
                    <Drawer
                        open={isReviewOpened}
                        onClose={onDrawerClose}
                    >
                        <Reviews
                            threadId={domain[1].id}
                        />
                    </Drawer>
                </Card>
            ))}
      </Space>
    )
};

export default DomainFeed;