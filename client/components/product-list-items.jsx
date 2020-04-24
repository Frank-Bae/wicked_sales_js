import React from 'react';

function ProductListItems(props) {

  return (
    <div className="card">
      <img src="https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340" className="card-img-top" alt="" />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-price">price</p>
        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum praesentium, repellendus dolorum autem exercitationem, fugiat accusamus vero veniam eius voluptatem a. Quasi quisquam fuga maiores unde perferendis reprehenderit libero expedita.</p>
      </div>
    </div>
  );
}

export default ProductListItems;
