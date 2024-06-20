import {FC, useState} from 'react';


import {usePagination} from '@hooks/usePagination';
import {Tag, Card, Space, Pagination} from 'antd';


const Feed: FC = () => {
    const [feed, setFeed] = useState<unknown[]>([]);
    const {onChangePage, currentPage, pageSize, total} = usePagination({
        setData: setFeed,
        getUrl: '/scans/get-data'
    });

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

export default Feed;