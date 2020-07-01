import React from 'react';
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
        <img className="quote" src="https://quotefancy.com/media/wallpaper/3840x2160/964358-Jonathan-Ive-Quote-Apple-s-goal-isn-t-to-make-money-Our-goal-is-to.jpg" alt="" />
        <div className="row mb-5">
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
