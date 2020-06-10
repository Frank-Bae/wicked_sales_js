import React from 'react';
import Modal from './modal';
import ProductListItems from './product-list-items';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          products: data
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    return (
      <div className="container">
        <Modal />
        <div className="row">
          {
            this.state.products.map(product => {
              return <ProductListItems setView={this.props.setView} key={product.productId} product={product} />;
            })
          }
        </div>
      </div>
    );
  }
}
