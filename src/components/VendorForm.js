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

const VendorForm = props => {
  const { state, handleChange, handleSubmit } = props;
  return (
    <GridList style={styles.gridlist}>
      <Card>
        <CardText>
          <form id="vendor-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="orderName">Order Name:</label>
              <input
                type="text"
                name="orderName"
                value={state.orderName}
                onChange={handleChange}
                placeholder="Required"
              />
            </div>

            <div>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                name="description"
                value={state.description}
                onChange={handleChange}
                placeholder="Required"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={!state.orderName || !state.description ? true : false}
              >
                Submit Order Request
              </button>
            </div>
          </form>
        </CardText>
      </Card>
    </GridList>
  );
};

export default VendorForm;
