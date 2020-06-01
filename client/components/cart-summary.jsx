import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {

  render() {
    const itemTotals = this.props.cart.length;
    let result = 0;
    for (let i = 0; i < itemTotals; i++) {
      const price = this.props.cart[i].price;
      result += price;
    }
    return (
      <div className="container">
        <div className="row mt-5" onClick={() => this.props.setView('catalog', {})}>
          <p className="hover ml-4">Back to Catalog</p>
        </div>
        <div className="row mb-4 ml-1">
          <h1>My Cart</h1>
        </div>
        <div className="row">
          {
            this.props.cart.map(cartItem => {
              return <CartSummaryItem setView={this.props.setView} key={cartItem.cartItemId} cart={cartItem} />;
            })
          }
        </div>
        <h2>Item Totals: ${(result / 100).toFixed(2)}</h2>
      </div>
    );
  }
}
