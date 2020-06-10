import React from 'react';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
    this.handleButton = this.handleButton.bind(this);
  }

  handleButton() {
    console.log('clicked');
  }

  render() {
    return (
      <div id="modal">
        <div className="modalContent">
          <h1>Welcome to Wicked Sales</h1>

          <p>This is a live demo site for the sole purpose of demonstartion. The products
            displayed here are not avaibale for purchases. </p>
          <button onClick={() => this.handleButton()} id="button">Close</button>
        </div>
      </div>
    );
  }
}
