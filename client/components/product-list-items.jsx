import React from 'react';

function ProductListItems(props) {
  const product = props.product;
  return (
    <div className="col-md-4 mt-3" onClick={() => props.setView('details', { product: product.productId })}>
      <div key={product.productId} className="card h-100">
        <img src={product.image} className="card-img-top" alt="" />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-price">${(product.price / 100).toFixed(2)}</p>
          <p className="card-text">{product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductListItems;
