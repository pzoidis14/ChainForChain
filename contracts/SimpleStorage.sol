pragma solidity ^0.4.18;

contract SimpleStorage {

    /*-------------------- DATA TYPES --------------------*/

    struct Order {
        string orderName;
        string description;
        uint daysToDeliver;
        uint price;
        uint dailyAttrition;
        uint attritionCutoff;
        bool shipperComplete;
        bool vendorComplete;
    }

    /*--------------------- STORAGE ---------------------*/

    // stores all our orders
    Order[] orders;

    /*--------------------- CREATION ---------------------*/

    function createOrder(string orderName, string description, uint daysToDeliver, uint price, uint dailyAttrition, uint attritionCutoff) public {
        // create an order and push it into the storage array
        uint id = orders.push(Order(orderName, description, daysToDeliver, price, dailyAttrition, attritionCutoff, false, false)) - 1;
    }

    /*-------------------- COMPLETION --------------------*/

    function shipperCompleteOrder(uint id) public {
        // access the order in storage
        Order storage order = orders[id];
        // mark the order as complete
        order.shipperComplete = true;
    }

    function vendorCompleteOrder(uint id) public {
        // access the order in storage
        Order storage order = orders[id];
        // mark the order as complete
        order.vendorComplete = true;
    }

    /*--------------------- QUERYING ---------------------*/

    // on the front end, we can initially call this func to get the total number of orders
    // then create a for loop, loop from (i = 0 => totalOrders) and call returnOrder (seen below)
    function getTotalNumOrders() public view returns (uint){
        return orders.length;
    }

    function returnOrder(uint orderId) public view returns (string orderName, string description, uint daysToDeliver, uint price, uint dailyAttrition, uint attritionCutoff, bool shipperComplete, bool vendorComplete) {
        Order storage order = orders[orderId];
        orderName = order.orderName;
        description = order.description;
        daysToDeliver = order.daysToDeliver;
        price = order.price;
        dailyAttrition = order.dailyAttrition;
        attritionCutoff = order.attritionCutoff;
        shipperComplete = order.shipperComplete;
        vendorComplete = order.vendorComplete;
    }
}
