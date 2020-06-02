import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      creditCard: null
    };
  }

  render() {
    return (
      <div className="container">
        <h1 className="mt-5">My Cart</h1>
        <p>Order Total: null</p>
        <form action="">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" placeHolder="John Doe"/>
          </div>
        </form>
      </div>
    );
  }
}
