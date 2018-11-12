import React from 'react';
import { GridList, Card, Divider } from 'material-ui/';
import BidPreview from './BidPreview';
// import BidComponent from './SubmitBid';
import CreateOrderBtn from './CreateOrderBtn.js';

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

const OpenBids = props => {
  return (
    <div>
      <GridList style={styles.gridlist}>
        {!!props.orders ? (
          props.orders.map(order => (
            <div>
              <Card>
                <BidPreview order={order} />
                <Divider />
                {/* <BidComponent
                  orderId={order.id}
                  submitBid={props.submitBid}
                  fetchOrders={props.fetchOrders} */}
                />
                <CreateOrderBtn createOrder={props.createOrder} order={order} />
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

export default OpenBids;
