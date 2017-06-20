import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  onClick = () => {
    console.log('No error should be logged to the console!');
  };

  render () {
    return (
      <button onClick={this.onClick}>
        Hello, tap me!
      </button>
    );
  }
}

render(<App />, document.getElementById('container'));
