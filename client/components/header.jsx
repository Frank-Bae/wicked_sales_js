import React from 'react';

function Header(props) {
  const cartItemCount = props.cartItemCount.length;
  return (
    <div className=" bg-dark">
      <div className="container flex-header">
        <h3 className="text-white py-2 pr-0">
          <i className="fas fa-dollar-sign"></i>Wicked Sales
        </h3>
        <p>{`${cartItemCount} items`}<i className="fas fa-shopping-cart fa-2x cart py-2 hover"></i></p>
      </div>
    </div>
  );
}

export default Header;
