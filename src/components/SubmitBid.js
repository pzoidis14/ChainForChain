import React, { Component } from 'react';
import BidForm from './BidForm';

class SubmitBid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daysToDeliver: 0,
      price: 0,
      dailyAttrition: 0,
      attritionCutoff: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: Number(event.target.value),
    });
  }

  async handleSubmit(event) {
    const {
      daysToDeliver,
      price,
      dailyAttrition,
      attritionCutoff,
    } = this.state;
    event.preventDefault();
    await this.props.submitBid(
      this.props.orderId,
      daysToDeliver,
      price,
      dailyAttrition,
      attritionCutoff
    );
    await this.props.fetchOrders();

    this.setState({
      daysToDeliver: '',
      price: 0,
      dailyAttrition: 0,
      attritionCutoff: '',
    });
  }

  render() {
    const { orderId } = this.props;

    return (
      <div>
        <BidForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          orderId={orderId}
          state={this.state}
        />
      </div>
    );
  }
}

export default SubmitBid;
