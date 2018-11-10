import React from 'react';
import { CardText } from 'material-ui/';

const BidForm = props => {
  const { handleSubmit, handleChange, state } = props;

  return (
    <CardText>
      <h3>Submit Bid:</h3>
      <form id="bid-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="daysToDeliver">Days to Deliver: </label>
          <input
            type="text"
            name="daysToDeliver"
            value={state.daysToDeliver}
            onChange={handleChange}
          />
          days
        </div>

        <div>
          <label htmlFor="price">Price: $</label>
          <input
            type="text"
            name="price"
            value={state.price}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="dailyAttrition">Daily Attrition: </label>
          <input
            type="text"
            name="dailyAttrition"
            value={state.dailyAttrition}
            onChange={handleChange}
          />
          %
        </div>

        <div>
          <label htmlFor="attritionCutoff">Attrition Cutoff: </label>
          <input
            type="text"
            name="attritionCutoff"
            value={state.attritionCutoff}
            onChange={handleChange}
          />
          %
        </div>

        <div>
          <button
            type="submit"
            disabled={
              !state.daysToDeliver ||
              !state.dailyAttrition ||
              !state.price ||
              !state.attritionCutoff
                ? true
                : false
            }
          >
            Submit Bid
          </button>
        </div>
      </form>
    </CardText>
  );
};

export default BidForm;
