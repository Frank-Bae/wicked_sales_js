import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeCreditCard = this.handleChangeCreditCard.bind(this);
    this.handleChangeShippingAddress = this.handleChangeShippingAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleChangeCreditCard(event) {
    this.setState({
      creditCard: event.target.value
    });
  }

  handleChangeShippingAddress(event) {
    this.setState({
      shippingAddress: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const information = { ...this.state };
    console.log(information);
    this.props.placeOrder(information);
  }

  render() {
    return (
      <div className="container">
        <h1 className="mt-5">My Cart</h1>
        <p>Order Total: null</p>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input onChange={this.handleChangeName} type="text" className="form-control" id="name" placeholder="John Doe"/>
          </div>
          <div className="form-group">
            <label htmlFor="creditCard">Credit Card</label>
            <input onChange={this.handleChangeCreditCard} type="number" className="form-control" id="creditcard" placeholder="0000-0000-0000-0000"/>
          </div>
          <div className="form-group">
            <label htmlFor="shippingAddress">Shipping Address</label>
            <textarea onChange={this.handleChangeShippingAddress} className="form-control" id="shippingAddress" rows="2" placeholder="9382 Brooklyn Blvd, New York, NY, 01923"></textarea>
          </div>
          <div className="d-flex justify-content-between row mt-5">
            <p className="ml-3">Continue Shopping</p>
            <button type="submit" className="mr-3 btn btn-primary">Checkout</button>
          </div>
        </form>
      </div>
    );
  }
}
