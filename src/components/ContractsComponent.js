import React from 'react';
import { CardText, Card, GridList } from 'material-ui/';

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

const ContractsComponent = props => {
  const {
    // id,
    orderName,
    description,
    // daysToDeliver,
    // price,
    // dailyAttrition,
    // attritionCutoff,
    shipperComplete,
    vendorComplete,
  } = props;

  return (
    <div>
      <GridList style={styles.gridlist}>
        <Card>
          <CardText>
            <div>
              <p>Name: {orderName}</p>
              <p>Description: {description}</p>
              {/* <p>Days To Deliver: {daysToDeliver} days</p>
          <p>Price: ${price}</p>
          <p>Daily Attrition: {dailyAttrition}%</p>
          <p>Attrition Cutoff: {attritionCutoff}%</p> */}
              <p> Shipper Status: {shipperComplete.toString()}</p>
              <p>Vendor Status: {vendorComplete.toString()}</p>
            </div>
          </CardText>
        </Card>
      </GridList>
    </div>
  );
};

export default ContractsComponent;
