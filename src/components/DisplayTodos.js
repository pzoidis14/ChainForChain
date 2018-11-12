import React from 'react';
// import { Table, thead, tr, th, tbody, td, Jumbotron } from 'react-bootstrap';
// import CompleteTodoBtn from './CompleteTodoBtn'
import ContractsComponent from './ContractsComponent';

const DisplayOrders = ({ orders, vendorCompleteOrder }) => (
  <div>
    {orders && orders.length > 0 ? (
      <div>
        {orders.map(
          ([
            orderName,
            description,
            daysToDeliver,
            price,
            dailyAttrition,
            attritionCutoff,
            shipperComplete,
            vendorComplete,
          ]) => (
            <div>
              {console.log('orderName :', orderName)}
              {console.log('description :', description)}
              {console.log('daysToDeliver :', daysToDeliver)}
              {console.log('price :', price)}
              {console.log('dailyAttrition :', dailyAttrition)}
              {console.log('attritionCutoff :', attritionCutoff)}
              {console.log('shipperComplete :', shipperComplete)}
              {console.log('vendorComplete :', vendorComplete)}
              <ContractsComponent
                orderName={orderName}
                description={description}
                daysToDeliver={daysToDeliver}
                price={price}
                dailyAttrition={dailyAttrition}
                attritionCutoff={attritionCutoff}
                shipperComplete={shipperComplete}
                vendorComplete={vendorComplete}
              />
              {/* <button
              onClick={() => {
                console.log('hit2');
                window.web3.eth.getAccounts((err, [account]) => {
                  if (err) throw new Error(err);
                  else vendorCompleteOrder(order.id, { from: account });
                });
              }}
            /> */}
            </div>
          )
        )}
      </div>
    ) : (
      <div>
        <h3>No orders! </h3>
        <p>You don't have any open contracts yet.</p>
      </div>
    )}
  </div>
);

export default DisplayOrders;
