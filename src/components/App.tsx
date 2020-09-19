/** @jsx jsx */

import * as React from 'react';

import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { css } from '@emotion/core';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

enum Mode {
  Focus,
  Break,
}

interface AppProps {}

interface AppState {
  breakDuration: number;
  complete: boolean;
  elapsed: number;
  focusDuration: number;
  intervalId: number;
  mode: Mode;
}

class App extends React.Component<AppProps, AppState> {
  DEFAULT_ELAPSED = 0;
  // intervalId, when assigned via setInterval, will always be a numeric, non-zero value
  DEFAULT_INTERVAL_ID = 0;
  DEFAULT_TIMEOUT = 1_000;
  STOP_TEXT = 'Pause';
  START_TEXT = 'Start';
  RESET_TEXT = 'Reset';

  state = {
    // breakDuration: 5 * 60,
    breakDuration: 5,
    complete: false,
    elapsed: this.DEFAULT_ELAPSED,
    focusDuration: 65 * 60,
    // focusDuration: 10,
    intervalId: this.DEFAULT_INTERVAL_ID,
    mode: Mode.Focus,
  };

  componentDidUpdate(prevProps: AppProps, prevState: AppState) {
    if (this.state.elapsed !== prevState.elapsed) {
      if (this.isTimeUp) {
        this.completeInterval();
      }
    }
  }

  get actionButtonText(): string {
    return this.isIntervalRunning ? this.STOP_TEXT : this.START_TEXT;
  }

  get isComplete(): boolean {
    return this.state.complete;
  }

  get isFocusing(): boolean {
    return this.state.mode === Mode.Focus;
  }

  get isIntervalRunning(): boolean {
    return this.state.intervalId !== 0;
  }

  get isResettable(): boolean {
    return !this.isComplete && !this.isIntervalRunning;
  }

  get isTimeUp(): boolean {
    return this.state.elapsed >= this.timerDuration;
  }

  get isPaused(): boolean {
    return this.state.elapsed > 0 && !this.state.complete;
  }

  get mode(): Mode {
    return this.state.mode;
  }

  get timerDuration(): number {
    return this.state.mode === Mode.Break
      ? this.state.breakDuration
      : this.state.focusDuration;
  }

  handleIntervalTick = () => {
    this.setState(() => ({ elapsed: this.state.elapsed + 1 }));
  };

  handleNextModeClick = () => {
    this.toggleMode();
  };

  handleStartClick = () => {
    this.CHANGE_ME();
  };

  handleResetClick = () => {
    this.resetInterval();
  };

  completeInterval = () => {
    // this.toggleMode();
    this.stopInterval();
    this.setState(() => ({ complete: true }));
  };

  formatTimer = (timer: Date) => {
    let timeString: string;
    const x = this.timerDuration - this.state.elapsed;

    // 1 hour
    if (x >= 60 * 60) {
      timeString = timer.toISOString().substr(12, 7);
      console.log('>= 1 hour');
    } else if (x >= 60 * 10) {
      timeString = timer.toISOString().substr(14, 5);
      console.log('>= 10 min');
    } else if (x >= 0) {
      timeString = timer.toISOString().substr(15, 4);
      console.log('>= 0 min');
    }
    return timeString;
  };

  resetInterval = () => {
    this.stopInterval();
    this.setState(() => ({ elapsed: this.DEFAULT_ELAPSED }));
  };

  stopInterval = () => {
    window.clearInterval(this.state.intervalId);
    this.setState(() => ({ intervalId: this.DEFAULT_INTERVAL_ID }));
  };

  startInterval = () => {
    // Specify window to prevent incorrect method call
    const intervalId = window.setInterval(
      this.handleIntervalTick,
      this.DEFAULT_TIMEOUT
    );

    this.setState(() => ({ intervalId }));
  };

  private CHANGE_ME() {
    if (!this.state.intervalId) {
      this.startInterval();
    } else {
      this.stopInterval();
    }
  }

  startFocusing() {
    this.setMode(Mode.Focus);
  }

  startBreak() {
    this.setMode(Mode.Break);
  }

  setMode = (mode: Mode) => {
    switch (mode) {
      case Mode.Break:
        this.setState(() => ({ mode: Mode.Break }));
        break;
      case Mode.Focus:
        this.setState(() => ({ mode: Mode.Focus }));
        break;
    }
  };

  toggleMode = () => {
    this.setState(() => ({ complete: false }));
    if (this.state.mode === Mode.Break) {
      this.startFocusing();
    } else {
      this.startBreak();
    }

    this.CHANGE_ME();

    this.setState(() => ({ elapsed: this.DEFAULT_ELAPSED }));
  };

  render() {
    const Button = styled.button`
      background-color: #d04643;
      border: 1px solid #fff;
      border-radius: 4px;
      color: #fff;
      font-size: 1.5em;
      margin: 0 0.8em;
      padding: 0.3em;
      cursor: pointer;
      width: 10em;
    `;

    const CountdownDiv = styled.div`
      background-color: #d04643;
      border-radius: 5px;
      padding: 1em;
    `;

    const TimerDiv = styled.div`
      background-color: #d04643;
      color: #fff;
      display: flex;
      font-size: 5em;
      justify-content: center;
      padding: 0.3em;
    `;

    const startStopButton = (
      <Button onClick={this.handleStartClick}>{this.actionButtonText}</Button>
    );
    const resetButton = (
      <Button disabled={this.isIntervalRunning} onClick={this.handleResetClick}>
        {this.RESET_TEXT}
      </Button>
    );

    let nextModeText = '';

    if (this.mode === Mode.Break) {
      nextModeText = 'Start Focusing';
    } else {
      nextModeText = 'Start Break';
    }

    const nextModeButton = (
      <Button onClick={this.handleNextModeClick}>{nextModeText}</Button>
    );

    const date = new Date(0);
    date.setSeconds(this.timerDuration - this.state.elapsed);
    // const timeString = date.toISOString().substr(14, 5);
    // .substr(11, 8);

    const timeString = this.formatTimer(date);

    return (
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <CountdownDiv>
            <TimerDiv>{timeString}</TimerDiv>
            <div
              css={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {!this.isComplete && startStopButton}
              {this.isComplete && nextModeButton}
              {this.isResettable && resetButton}
            </div>
          </CountdownDiv>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
