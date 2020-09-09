import * as React from 'react';
import CountdownContainer from './CountdownContainer';
import Config from './Config';

interface AppProps {}

interface AppState {
  numPomodorosCompleted: number;
  isConfigHidden: boolean;
  countdownSeconds: number;
}

class App extends React.Component<AppProps, AppState> {
  state = {
    numPomodorosCompleted: 0,
    isConfigHidden: true,
    countdownSeconds: 0, // Default 25 min
  };

  handleConfigClose = (pomodoroDuration: number) => {
    console.log({ pomodoroDuration });
    this.setState({ countdownSeconds: pomodoroDuration * 60 });
  };

  componentDidMount() {
    try {
      const configValuesJson = localStorage.getItem('config');
      const configValues = JSON.parse(configValuesJson);
      console.log({ configValues });

      const numPomodorosCompleted = localStorage.getItem(
        'num_pomodoros_completed'
      );

      this.setState({
        numPomodorosCompleted: +numPomodorosCompleted,
        countdownSeconds: configValues.pomodoroDuration * 60,
      });
    } catch (error) {
      // Load the state defaults if there's an error parsing
      console.log(error);
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

  handleChangeCountdownSeconds = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Changing...');
  };

  render() {
    return (
      <div className="container">
        {this.state.isConfigHidden ? (
          <>
            <h1>focus</h1>
            {this.state.numPomodorosCompleted} completed
            <CountdownContainer
              countdownSeconds={this.state.countdownSeconds}
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
          <Config
            countdownSeconds={this.state.countdownSeconds}
            onClose={this.handleConfigClose}
            onChangeCountdownSeconds={this.handleChangeCountdownSeconds}
            onConfigClose={this.handleConfigHidden}
          />
        )}
      </div>
    );
  }
}

export default App;
