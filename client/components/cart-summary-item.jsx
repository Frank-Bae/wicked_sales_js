import React from 'react';

function CartSummaryItem(props) {
  const cartItem = props.cart;
  return (
    <div className="card mb-4">
      <div className="row no-gutters p-2 pt-3  d-flex justify-content-around shadow-sm align-items-center">
        <img className="col-sm-5 mr-2" src={cartItem.image} alt="" />
        <div className="col-sm-6">
          <h2>{cartItem.name}</h2>
          <p>${(cartItem.price / 100).toFixed(2)}</p>
          <p>{cartItem.shortDescription}</p>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
