import React from 'react';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.handleButton = this.handleButton.bind(this);
  }

  handleButton() {
    this.setState({
      show: true
    });
  }

  render() {
    const disable = (this.state.show) ? 'none' : 'modals';

    return (
      <div className={disable}>
        <div className="modalContent">
          <h1 className="bg-dark text-light text-center">Welcome to $Apples!</h1>
          <h4 className="red text-center"><strong>Disclaimer</strong></h4>
          <p className="text-center">The products and/or information contained in this website are for live demonstration purposes only. <span className="red">NONE OF THE PRODUCTS DISPLAYED ON WICKED SALES ARE FOR SALE.</span> No commercial transaction is intended in the creation and execution of the site. Please refrain from inputting any credit/debit card information or addresses in the site’s “checkout form.” </p>
          <p className="text-center line">By clicking on the <span className="red">“I ACCEPT”</span> button below, you are acknowledging and accepting that Wicked Sale is not transacting any merchandise. </p>
          <div className="row">
            <div className="col text-center">
              <button className="btn btn-primary px-5" onClick={() => this.handleButton()} id="button">I ACCEPT</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
