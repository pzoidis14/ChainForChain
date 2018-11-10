import React from 'react';
import { GridList, Card, Divider } from 'material-ui/';
import OrderPreview from './OrderPreview';
import SubmitBid from './SubmitBid';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

const OpenOrders = props => {
  return (
    <div>
      <GridList style={styles.gridlist}>
        {!!props.orders ? (
          props.orders.map(order => (
            <div>
              <Card>
                <OrderPreview order={order} />
                <Divider />
                <SubmitBid
                  orderId={order.orderId}
                  submitBid={props.submitBid}
                  fetchOrders={props.fetchOrders}
                />
              </Card>
            </div>
          ))
        ) : (
          <div>There are no orders to display</div>
        )}
      </GridList>
    </div>
  );
};

export default OpenOrders;
