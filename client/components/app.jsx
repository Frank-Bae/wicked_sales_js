import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: { name: 'catalog', params: {} },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: { name: name, params: params }
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => {
        this.setState({
          cart: data
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  addToCart(product) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    };
    fetch('api/cart', req)
      .then(response => response.json())
      .then(data => {
        const cartItems = this.state.cart.slice();
        cartItems.push(data);
        this.setState({
          cart: cartItems
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  componentDidMount() {
    this.getCartItems();
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  getView() {
    if (this.state.view.name === 'catalog') {
      return (
        <ProductList setView={this.setView} />
      );
    } else if (this.state.view.name === 'details') {
      return (
        <ProductDetails productId={this.state.view.params} setView={this.setView} addToCart={this.addToCart} />
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <h1>THIS SHOULD WORK</h1>
      );
    }
  }

  render() {
    const getView = this.getView();

    return (
      <div>
        <Header cartItemCount={this.state.cart} setView={this.setView} />
        <div>{getView}</div>
      </div>
    );
  }
}
