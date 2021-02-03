import React, { useState, useEffect } from 'react';
import { Card, Skeleton } from 'antd';

const LoadingCard = props => {

    const { times } = props;
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const newArray = [];

        for (let i = 0; i < times; i++) {
            newArray.push(<Card style={{ width: 300, height: 409 }}>
                <Skeleton style={{width: 300, height: 409 }} active></Skeleton>
            </Card>)
        }

        setCards(newArray);
    }, [])


    return (
        <div className='d-flex'>
            {
                cards.map(el => {
                    return el;
                })
            }
        </div>
        
    )
};

export default LoadingCard;