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

  getProductId(productId) {
    fetch(`/api/todos/${productId}`)
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
    if (this.state.product == null) {
      return (
        <div className="container">
          <div className="row">back to catalog</div>
          <div classnmae="row"></div>
          <div></div>
        </div>
      );
    } else {
      return null;
    }
  }
}
