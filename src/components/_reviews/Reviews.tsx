import {FC, useCallback, useState, ChangeEvent, useLayoutEffect} from 'react';
import {Input, Button, Avatar, Space} from 'antd';
import {SendOutlined, UserOutlined} from '@ant-design/icons';

import {BaseClient} from '@components/context/AuthContext';

interface IReviewsProps {
    threadId: number;
}

interface IReview {
    description: string;
    userName: string;
}

const Reviews: FC<IReviewsProps> = ({threadId}) => {
    const [inputValue, setInputValue] = useState('');
    const [reviews, setReviews] = useState<IReview[]>([]);

    const fetchData = useCallback(async () => {
        const response = await BaseClient.get('/reviews/get', {
            params: {
                domainId: threadId
            }
        });

        setReviews(response.data);
    }, [threadId])

    useLayoutEffect(() => {
        fetchData();
    }, [fetchData]);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    }, []);

    const onSend = useCallback(async () => {
        setInputValue('');
        const response = await BaseClient.post('/reviews/send-message', {
            data: {
                message: inputValue,
                domainId: threadId
            }
        });

        fetchData();
    }, [inputValue, fetchData]);

    return (
        <div style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <div>
                <div style={{fontSize: "32px", fontWeight: "bold", textAlign: "center"}}>Отзывы</div>
                <Space
                    style={{width: "100%"}}
                    direction="vertical"
                    size={32}
                >
                    {reviews.map((review) => (
                        <div style={{border: "2px solid grey", padding: "4px 8px", borderRadius: "20px", background: "aliceblue"}}>
                            <div style={{color: "#4096ff", fontSize: "20px", fontWeight: "bold"}}>{review.userName}</div>
                            <div style={{display: "flex", alignItems: "baseline", marginTop: "8px", marginBottom: "8px"}}>
                                <Avatar style={{flexShrink: 0}} size="default" icon={<UserOutlined />} />
                                <div style={{marginLeft: "12px", fontSize: "16px"}}>{review.description}</div>
                            </div>
                        </div>
                    ))}
                </Space>
            </div>
            <div style={{display: "flex"}}>
                <Input
                    value={inputValue}
                    onChange={onChange}
                    placeholder={"Введите свой отзыв"}
                />
                <Button
                    style={{marginLeft: "12px"}}
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={onSend}
                />
            </div>
        </div>
    );
};

export default Reviews;