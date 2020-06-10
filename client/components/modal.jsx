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
    if (this.state.show) {
      document.getElementById('modal').style.display = 'none';
    }

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
