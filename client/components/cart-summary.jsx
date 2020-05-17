import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row mt-5" onClick={() => this.props.setView('catalog', {})}>
          <p className="hover">Back to Catalog</p>
        </div>
        <div className="row">
          <h1>My Cart</h1>
        </div>
        <div className="row">
          {
            this.props.cart.map(cartItem => {
              return <CartSummaryItem setView={this.props.setView} key={cartItem.cartItemId} cart={cartItem} />;
            })
          }
        </div>
      </div>
    );
  }
}
