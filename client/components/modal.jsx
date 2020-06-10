import React from 'react';

export default class Modal extends React.Component {

  render() {
    window.onload = function () {
      document.getElementById('button').onclick = function () {
        document.getElementById('modal').style.display = 'none';
      };
    };
    return (
      <div id="modal">
        <div className="modalconent">
          <h1></h1>

          <p>fasfsdfasfsfsdfsdfsdsffsd</p>
          <button id="button">Close</button>
        </div>
      </div>
    );
  }
}
