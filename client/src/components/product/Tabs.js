import React, { useState } from 'react';
import { Card } from 'antd';

const Tabs = props => {

    const { description } = props;
    const [key, setKey] = useState('description')

    const tabListNoTitle = [
        {
          key: 'description',
          tab: 'Description',
        },
        // {
        //   key: 'more',
        //   tab: 'More',
        // },
    ];

    const contentListNoTitle = {
        description: <div>{description}</div>,
        // more: <div>Nothing to show</div>,
    };

    const onTabChange = (key, type) => {
        setKey(key);
    };

    return (
        <Card
          style={{ width: '100%' }}
          tabList={tabListNoTitle}
          activeTabKey={key}
          onTabChange={key => {
            onTabChange(key, 'noTitleKey');
          }}
        >
          {contentListNoTitle[key]}
        </Card>
    )
};

export default Tabs;