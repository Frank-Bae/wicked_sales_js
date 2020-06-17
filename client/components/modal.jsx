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
          <h1 className="bg-dark text-light text-center">Welcome to $Apples</h1>
          <h4 className="red text-center"><strong>Disclaimer</strong></h4>
          <p>This is a live demo site for the sole purpose of demonstartion. The products
            displayed here are not avaibale for purchases. Please do not put your real
            creditcard and shipping address in the checkout form. Thank you.</p>
          <p className="text-center line">By accepting you acknowledge the merchandises displayed are not available for purchase </p>
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
