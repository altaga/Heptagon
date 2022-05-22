import React, { Component } from 'react';
import reactAutobind from 'react-autobind';
import Login from './screens/login/login';
import Main from './screens/main/main';
import ContextModule from './utils/contextModule';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeScreen: 1,
    };
    reactAutobind(this);
  }

  static contextType = ContextModule;

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  changeScreen(screen) {
    this.setState({
      activeScreen: screen
    });
  }

  setEwallet(ewallet) {
    this.context.setValue({
      ewallet: ewallet
    });
  }

  render() {
    return (
      <div>
        {
          this.state.activeScreen === 1 &&
          <Login changeScreen={this.changeScreen} setEwallet={this.setEwallet} />
        }
        {
          this.state.activeScreen === 2 &&
          <Main changeScreen={this.changeScreen} />
        }
      </div>
    );
  }
}

export default App;