import React, { useState } from 'react'
import { Card } from 'antd';
import CardDetails from './CardDetails';

  const tabListNoTitle = [
    {
      key: 'All',
      label: 'All',
    },
    {
      key: 'Individual',
      label: 'Individual Villa',
    },
    {
      key: 'Apartments',
      label: 'Apartments',
    },
  ];
  const contentListNoTitle = {
    All: <CardDetails title="All Properties" description="Browse all available properties"/>,
    Individual: <CardDetails />,
    Apartments: <CardDetails />,
  };
const Data = () => {
    const [activeTabKey2, setActiveTabKey2] = useState('All');
   
    const onTab2Change = (key) => {
      setActiveTabKey2(key);
    };
    return (
      <>
        
        <Card
          style={{
            width: '70%',
            margin:'10%'
          }}
          tabList={tabListNoTitle}
          activeTabKey={activeTabKey2}
          tabBarExtraContent={<a href="#">More</a>}
          onTabChange={onTab2Change}
          tabProps={{
            size: 'middle',
          }}
        >
          {contentListNoTitle[activeTabKey2]}
        </Card>
      </>
    );
  };
   


export default Data