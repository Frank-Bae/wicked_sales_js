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
    const id = this.props.productId.product;
    fetch(`/api/products/${id}`)
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
        <div className="container mt-3 mb-5">
          <div className="card d-flex flex-nowrap">
            <div className="col-sm-5 pt-3 pl-3 " onClick={() => this.props.setView('catalog', {})}>
              <p className="hover">Back to Catalog</p>
            </div>
            <div className="row no-gutters p-2 pt-3 d-flex justify-content-around">
              <img className="col-sm-5 mr-2" src={product.image} alt="" />
              <div className="col-sm-6">
                <h2>{product.name}</h2>
                <p>${(product.price / 100).toFixed(2)}</p>
                <p>{product.shortDescription}</p>
                <button onClick={() => this.props.addToCart(this.state.product)} type="button" className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
            <div className="pr-5 pl-5 pb-3 pt-3">
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
