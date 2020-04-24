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
    const product = this.state.product;
    if (this.state.product != null) {
      return (
        <div className="container">
          <div className="card col-md-12 box">
            <div className="row pl-4">
              <p>Back to Catalog</p>
            </div>
            <div className="row pl-4">
              <img src={product.image} alt="" />
              <div className="card-body">
                <h2 className="card-title pl-1">{product.name}</h2>
                <p className="card-price pl-1">${(product.price / 100).toFixed(2)}</p>
                <p className="card-text pl-1">{product.shortDescription}</p>
              </div>
            </div>
            <div className="row pl-4">
              <p>{product.longDescription}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
