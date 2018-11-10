import React from 'react';
import { CardText } from 'material-ui/';

const OrderPreview = props => {
  const order = props.order;

  return (
    <div>
      <CardText>
        <div>
          <p>Name: {order.orderName}</p>
          <p>Description: {order.description}</p>
        </div>
      </CardText>
    </div>
  );
};

export default OrderPreview;
