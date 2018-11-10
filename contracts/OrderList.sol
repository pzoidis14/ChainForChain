pragma solidity ^0.4.18;

contract OrderList {

    /*-------------------- DATA TYPES --------------------*/

    struct Order {
        string task;
        string shipperName;
        uint price;
        uint lateDeliveryAttrition;
        bool complete;
    }

    /*--------------------- STORAGE ---------------------*/

    // stores all our orders
    Order[] orders;

    /*--------------------- CREATION ---------------------*/

    function createOrder(string task, string shipperName, uint price, uint lateDeliveryAttrition) public {
        // create an order and push it into the storage array
        uint id = orders.push(Order(task, shipperName, price, lateDeliveryAttrition, false)) - 1;
    }

    /*-------------------- COMPLETION --------------------*/

    function completeOrder(uint id) public {
        // access the order in storage
        Order storage order = orders[id];
        // mark the order as complete
        order.complete = true;
    }

    /*--------------------- QUERYING ---------------------*/

    // on the front end, we can initially call this func to get the total number of todos
    // then create a for loop, loop from (i = 0 => totalToDos) and call returnToDo (seen below)
    function getTotalNumOrders() public view returns (uint){
        return orders.length;
    }

    function returnOrder(uint orderId) public view returns (string task, bool completed) {
        Order storage order = orders[orderId];
        task = order.task;
        completed = order.complete;
    }
}
