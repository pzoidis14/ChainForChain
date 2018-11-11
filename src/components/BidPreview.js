import React from 'react';
import { CardText } from 'material-ui/';

const BidPreview = props => {
  const order = props.order;
  // console.log(order);

  return (
    <div>
      <CardText>
        <div>
          {console.log('hit')}
          <p>Name: {order.orderName}</p>
          <p>Description: {order.description}</p>
          <p>Days To Deliver: {order.daysToDeliver} days</p>
          <p>Price: ${order.price}</p>
          <p>Daily Attrition: {order.dailyAttrition}%</p>
          <p>Attrition Cutoff: {order.attritionCutoff}%</p>
        </div>
      </CardText>
    </div>
  );
};

export default BidPreview;
