import * as React from 'react';
import CountdownContainer from './CountdownContainer';
import Config from './Config';

interface AppProps {}

interface AppState {
  numPomodorosCompleted: number;
  isConfigHidden: boolean;
}

class App extends React.Component<AppProps, AppState> {
  state = {
    numPomodorosCompleted: 0,
    isConfigHidden: true,
  };

  componentDidMount() {
    const numPomodorosCompleted = localStorage.getItem(
      'num_pomodoros_completed'
    );
    if (numPomodorosCompleted) {
      this.setState({ numPomodorosCompleted: +numPomodorosCompleted });
    }
  }

  componentDidUpdate(prevProps: AppProps, prevState: AppState) {
    if (this.state !== prevState) {
      if (
        this.state.numPomodorosCompleted !== prevState.numPomodorosCompleted
      ) {
        localStorage.setItem(
          'num_pomodoros_completed',
          this.state.numPomodorosCompleted.toString()
        );
      }
    }
  }

  handlePomodoroTick = (elapsedSeconds: number) => {
    // localStorage.setItem('elapsed_seconds', elapsedSeconds.toString());
  };

  handleConfigShown = () => {
    this.setState({ isConfigHidden: false });
  };

  handleConfigHidden = () => {
    // TODO Stop updating if config is shown...
    this.setState({ isConfigHidden: true });
  };

  render() {
    return (
      <div className="container">
        {this.state.isConfigHidden ? (
          <>
            <h1>focus</h1>
            {this.state.numPomodorosCompleted} completed
            <CountdownContainer
              onFocusDone={() =>
                this.setState((prevState) => ({
                  numPomodorosCompleted: prevState.numPomodorosCompleted + 1,
                }))
              }
              onPomodoroTick={this.handlePomodoroTick}
            />
            <button onClick={this.handleConfigShown}>Config</button>
          </>
        ) : (
          <Config onConfigClose={this.handleConfigHidden} />
        )}
      </div>
    );
  }
}

export default App;
