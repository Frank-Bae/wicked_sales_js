import React from 'react';

function Header(props) {
  const cartItemCount = props.cartItemCount.length;
  const setView = props.setView;
  return (
    <div className=" bg-dark">
      <div className="container flex-header">
        <h3 className="text-white py-2 pr-0 hover" onClick={() => setView('catalog', {})}>
          <i className="fas fa-dollar-sign"></i>Apples
        </h3>
        <p className="hover" onClick={() => setView('cart', {})}>{`${cartItemCount} items`}<i onClick={() => setView('cart', {})} className="fas fa-shopping-cart fa-2x cart py-2 hover"></i></p>
      </div>
    </div>
  );
}

export default Header;
