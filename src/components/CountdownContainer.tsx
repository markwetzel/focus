import * as React from 'react';
import Countdown from './Countdown';

interface CountdownContainerProps {
  onFocusDone: Function;
  onPomodoroTick?: Function;
}

interface CountdownContainerState {
  isFocusing: boolean;
}

class CountdownContainer extends React.Component<
  CountdownContainerProps,
  CountdownContainerState
> {
  state = {
    isFocusing: true,
  };

  componentDidMount() {
    if (!localStorage.getItem('mode')) {
      localStorage.setItem('mode', this.state.isFocusing ? 'focus' : 'break');
    } else {
      const mode = localStorage.getItem('mode');
      console.log('Mode', mode);

      const isFocusing = mode === 'focus' ? true : false;
      this.setState({ isFocusing });

      if (isFocusing) {
        document.body.style.backgroundColor = 'var(--focus-color)';
      } else {
        document.body.style.backgroundColor = 'var(--break-color)';
      }
    }
  }

  componentDidUpdate(
    prevProps: CountdownContainerProps,
    prevState: CountdownContainerState
  ) {
    if (prevState.isFocusing !== this.state.isFocusing) {
      localStorage.setItem('mode', this.state.isFocusing ? 'focus' : 'break');
    }
  }

  break = () => {
    document.body.style.backgroundColor = 'var(--break-color)';
    this.setState({ isFocusing: false });

    this.props.onFocusDone();
  };

  focus = () => {
    document.body.style.backgroundColor = 'var(--focus-color)';
    this.setState({ isFocusing: true });
  };

  handlePomodoroDone = () => {
    document.body.style.backgroundColor = 'var(--break-color)';
    this.setState({ isFocusing: false });
    this.props.onFocusDone();
  };

  handleBreakDone = () => {
    this.focus();
  };

  handlePomodoroStart = () => {
    document.body.style.backgroundColor = '#f44336';
  };

  handleBreakStart = () => {
    document.body.style.backgroundColor = '#4caf50';
  };

  handlePomodoroPause = () => {
    document.body.style.backgroundColor = '#f44336';
  };

  handleBreakPause = () => {
    document.body.style.backgroundColor = '#4caf50';
  };

  render() {
    return (
      <>
        {this.state.isFocusing ? (
          <Countdown
            length={1}
            onComplete={this.handlePomodoroDone}
            onPause={this.handlePomodoroPause}
            onStart={this.handlePomodoroStart}
            onTick={this.props.onPomodoroTick}
            title="Time to focus"
          />
        ) : (
          <Countdown
            length={1}
            onComplete={this.handleBreakDone}
            onPause={this.handleBreakPause}
            onStart={this.handleBreakStart}
            onTick={this.props.onPomodoroTick}
            title="Take a break"
          />
        )}
      </>
    );
  }
}

export default CountdownContainer;
