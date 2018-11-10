// Initial State
const defaultOrders = [];

// Actions
export const ADD_TO_ORDERS = 'ADD_TO_ORDERS';
const UPDATE_ORDER = 'UPDATE_ORDER';
const REMOVE_FROM_ORDERS = 'REMOVE_FROM_ORDERS';
const GET_ORDERS = 'GET_ORDERS';

// Action creators
export const addToOrders = order => ({
  type: ADD_TO_ORDERS,
  order,
});

export const updateOrder = order => ({
  type: UPDATE_ORDER,
  order,
});

// export const removeOrder = robotId => ({
//   type: REMOVE_FROM_ORDERS,
//   robotId,
// });

export const getOrders = orders => ({
  type: GET_ORDERS,
  orders,
});

//Thunk creator

export const updateOrderThunk = (
  orderId,
  daysToDeliver,
  price,
  dailyAttrition,
  attritionCutoff
) => {
  return async dispatch => {
    try {
      let entryMatch = await JSON.parse(localStorage.getItem(orderId));

      entryMatch.bid = true;
      entryMatch.daysToDeliver = daysToDeliver;
      entryMatch.price = price;
      entryMatch.dailyAttrition = dailyAttrition;
      entryMatch.attritionCutoff = attritionCutoff;

      await localStorage.setItem(
        JSON.stringify(orderId),
        JSON.stringify(entryMatch)
      );
      dispatch(updateOrder(entryMatch));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addOrderThunk = newOrderObj => {
  return async (dispatch, getState) => {
    try {
      let orderId = 0;
      if (getState().orders.length) {
        orderId = getState().orders.length;
      }
      newOrderObj.orderId = orderId;
      await localStorage.setItem(
        JSON.stringify(orderId),
        JSON.stringify(newOrderObj)
      );
      dispatch(addToOrders(newOrderObj));
    } catch (err) {
      console.log(err);
    }
  };
};

// export const removeOrderThunk = robotId => {
//   return async dispatch => {
//     try {
//       await localStorage.removeItem(JSON.stringify(robotId))
//       dispatch(removeRobotGuest(robotId))
//     } catch (err) {
//       console.log(err)
//     }
//   }
// }

export const fetchOrdersThunk = () => {
  return dispatch => {
    try {
      let allOrderIds = Object.keys(localStorage);
      let allOrders = allOrderIds.map(async id => {
        let order = JSON.parse(localStorage.getItem(id));
        return order;
      });
      Promise.all(allOrders).then(orders => dispatch(getOrders(orders)));
    } catch (err) {
      console.log(err);
    }
  };
};

// Reducer

const orderReducer = (state = defaultOrders, action) => {
  switch (action.type) {
    case ADD_TO_ORDERS:
      return [...state, action.newOrder];
    case UPDATE_ORDER:
      let newCartList = [...state].map(order => {
        if (order.orderId === action.order.orderId) {
          return action.entry;
        }
        return order;
      });
      return [newCartList];

    case REMOVE_FROM_ORDERS:
      return {
        ...state,
        cartList: [...state.cartList].filter(
          entry => entry.robotInfo.id !== action.robotId
        ),
      };
    case GET_ORDERS:
      return action.orders;

    default:
      return state;
  }
};

export default orderReducer;
