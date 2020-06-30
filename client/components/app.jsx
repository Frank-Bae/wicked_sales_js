import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import Banner from './banner';
import Modal from './modal';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: { name: 'cart', params: {} },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
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

  placeOrder(information) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(information)
    };
    fetch('/api/orders', req)
      .then(results => results.json())
      .then(data => this.setState({
        cart: [],
        view: {
          name: 'catalog',
          params: {}
        }
      }))
      .catch(err => console.error(err));
  }

  deleteOrder(cartItemId) {
    fetch(`/api/cart/${cartItemId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        const deleteItem = this.state.cart.slice();
        for (let i = 0; i < deleteItem.length; i++) {
          if (deleteItem[i].cartItemId === cartItemId) {
            deleteItem.splice(i, 1);
            break;
          }
        }
        this.setState({ cart: deleteItem });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  componentDidMount() {
    this.getCartItems();
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
        <CartSummary cart={this.state.cart} setView={this.setView}/>
      );
    } else if (this.state.view.name === 'CheckoutForm') {
      return (
        <CheckoutForm cart={this.state.cart} placeOrder={this.placeOrder} setView={this.setView}/>
      );
    }
  }

  banner() {
    if (this.state.view.name === 'catalog') {
      return (
        <Banner />
      );
    }
  }

  render() {
    const getView = this.getView();
    const banner = this.banner();

    return (
      <div>
        <Header cartItemCount={this.state.cart} setView={this.setView} />
        <div>{banner}</div>
        <div>{getView}</div>
        {/* <Modal /> */}
      </div>
    );
  }
}
