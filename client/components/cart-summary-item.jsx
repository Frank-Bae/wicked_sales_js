import React from 'react';

function CartSummaryItem(props) {
  const cartItem = props.cart;
  return (
    <div className="container mb-4">
      <div className="card col-md-12 box">
        <div className="row pl-4">
          <img className="pt-4 detail-image col-5" src={cartItem.image} alt="" />
          <div className="card-body col-6 mt-5">
            <h2 className="card-title pl-1">{cartItem.name}</h2>
            <p className="card-price pl-1">${(cartItem.price / 100).toFixed(2)}</p>
            <p className="card-text pl-1">{cartItem.shortDescription}</p>
          </div>
        </div>
        <div className="row pl-4 mt-4">
          <p>{cartItem.longDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
