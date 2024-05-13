import {FC, useLayoutEffect, useState} from 'react';

import {BaseClient} from '@components/context/AuthContext';

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
        <div style={{border: "2px solid cadetblue"}}>
            {feed.map((item) => {

                return (
                    <div key={item!.id}>
                        <div>{item.url}</div>
                        <div>{item.description}</div>
                        <div>Есть запрещенный контент: {item.result+''}</div>
                        <div>
                            Категория:
                            <div color={item.tag.color}>
                                {item.tag.name}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Feed;