import React from 'react';

class Clock extends React.Component {
  state = { date: new Date(), status: 'Stop' };

  componentDidMount() {
    this.start();
  }

  start() {
    this.timer = setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);
  }

  handleClick = () => {
    if (this.state.status == 'Stop') {
      this.setState({ status: 'Start' });
      clearInterval(this.timer);
    } else {
      this.setState({ status: 'Stop' });
      this.start();
    }
  };

  render() {
    return (
      <div>
        <h1>{this.state.date.toLocaleTimeString()}</h1>
        <button onClick={this.handleClick}>{this.state.status}</button>
      </div>
    );
  }
}

export default Clock;
