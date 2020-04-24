import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    this.getProductId();
  }

  getProductId() {
    fetch('/api/products/1')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          product: data
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    if (this.state.product != null) {
      return (
        <div className="container">
          <div className="row">{this.state.product.name}</div>
        </div>
      );
    } else {
      return null;
    }
  }
}
