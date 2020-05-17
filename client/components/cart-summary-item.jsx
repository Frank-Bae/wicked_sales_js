import React from 'react';

function CartSummaryItem(props) {
  const cartItem = props.cart;
  console.log(cartItem);
  return (

    <div className="col-md-4 mt-3">
      <img src={cartItem.image} className="card-img-top" alt="" />
      {/* <div className="card-body">
        <h5 className="card-title">{cartItem.name}</h5>
        <p className="card-price">${(cartItem.price / 100).toFixed(2)}</p>
        <p className="card-text">{cartItem.shortDescription}</p>
      </div> */}
    </div>
  );
}

export default CartSummaryItem;
