import {FC, useCallback, useState} from 'react';


import {Card, Space, Button, Drawer, Pagination} from 'antd';
import DomainChart from "@components/_feed/Item/DomainChart";
import Reviews from "@components/_reviews/Reviews";
import {usePagination} from "@hooks/usePagination.tsx";

const DomainFeed: FC = () => {
    const [domains, setDomains] = useState<Record<string, Record<string, number>>>({});
    const [isReviewOpened, setIsReviewOpened] = useState(false);
    const {onChangePage, currentPage, pageSize, total} = usePagination({
        setData: setDomains,
        getUrl: '/domains/get-data'
    });

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
            <Pagination
                style={{display: "flex", justifyContent: "center"}}
                pageSize={pageSize}
                current={currentPage}
                total={total}
                onChange={onChangePage}
            />
      </Space>
    )
};

export default DomainFeed;