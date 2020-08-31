import * as React from 'react';
import Config from './Config';

interface CountdownProps {
  length: number;
  onComplete: Function;
  onStart?: Function;
  onPause?: Function;
  onReset?: Function;
  onTick?: Function;
  title: string;
}

interface CountdownState {
  isRunning: boolean;
  // intervalId: NodeJS.Timeout;
  intervalId: any;
  countdownSeconds: number;
  elapsedSeconds: number;
  input: {
    minutes: string;
  };
}

class Countdown extends React.Component<CountdownProps, CountdownState> {
  private interval?: number;
  private DEFAULT_INTERVAL: number = 1_000;

  state = {
    isRunning: false,
    intervalId: 0,
    countdownSeconds: 25 * 60,
    shortBreakSeconds: 300,
    elapsedSeconds: 0,
    input: {
      minutes: '',
    },
  };

  componentDidMount() {
    const elapsedSeconds = localStorage.getItem('elapsed_seconds');

    if (elapsedSeconds) {
      this.setState({ elapsedSeconds: +elapsedSeconds });
    }
  }

  constructor(props: CountdownProps) {
    super(props);
    this.interval = this.DEFAULT_INTERVAL;

    this.state.countdownSeconds = props.length * 60;
    this.state.input.minutes = props.length.toString();
  }

  componentDidUpdate(
    prevProps: CountdownProps,
    prevState: CountdownState
  ): void {
    if (prevState !== this.state) {
      if (
        this.state.isRunning &&
        this.state.elapsedSeconds >= this.state.countdownSeconds
      ) {
        this.reset();

        this.props.onComplete();
      }

      if (prevState.input.minutes !== this.state.input.minutes) {
        this.setState({ countdownSeconds: +this.state.input.minutes * 60 });
      }

      const t = new Date(
        (this.state.countdownSeconds - this.state.elapsedSeconds) * 1000
      )
        .toISOString()
        .substr(11, 8);

      if (this.state.elapsedSeconds !== prevState.elapsedSeconds) {
        localStorage.setItem(
          'elapsed_seconds',
          this.state.elapsedSeconds.toString()
        );
      }

      document.title = t;
    }
  }

  private start(): boolean {
    if (this.state.isRunning) return false;

    this.props.onStart && this.props.onStart();

    // if (this.state.input.minutes !== -1) {
    //   this.setState({ countdownSeconds: this.state.input.minutes });
    // }

    const intervalId = setInterval(this.tick, this.interval);
    this.setState({
      isRunning: true,
      intervalId,
    });

    return true;
  }

  private pause(): boolean {
    if (!this.state.isRunning) return false;

    this.props.onPause && this.props.onPause();

    clearInterval(this.state.intervalId);

    this.setState({ isRunning: false });

    return true;
  }

  private tick = (): void => {
    this.setState({ elapsedSeconds: this.state.elapsedSeconds + 1 });

    this.props.onTick(this.state.elapsedSeconds);
  };

  private reset(): boolean {
    if (this.state.isRunning) return false;

    clearInterval(this.state.intervalId);

    this.props.onReset && this.props.onReset();

    this.setState({ isRunning: false, elapsedSeconds: 0 });

    return true;
  }

  private get isPaused(): boolean {
    return !this.state.isRunning;
  }

  private get isRunning(): boolean {
    return this.state.isRunning;
  }

  handleResumeClick = (): void => {
    // User is starting
    if (this.isPaused) {
      this.start();
      return;
      // User is pausing
    } else if (this.isRunning) {
      this.pause();
    }
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let { name, value }: { name: string; value: string } = event.target;

    const input = { ...this.state.input };

    switch (name) {
      case 'minutes':
        if (+value > 240) {
          value = '240';
        } else if (+value < 5) {
          value = '5';
        }
        break;
    }

    input[name] = value;

    this.setState({ input });
  };

  handleResetClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    this.reset();
  };

  render(): JSX.Element {
    const timeLeft = new Date(
      (this.state.countdownSeconds - this.state.elapsedSeconds) * 1000
    )
      .toISOString()
      .substr(11, 8);

    const resumeButtonText = this.isPaused ? 'Start' : 'Pause';

    return (
      <>
        <h1>{this.props.title}</h1>

        <input
          type="number"
          placeholder="Minutes"
          name="minutes"
          value={this.state.input['minutes']}
          onChange={this.handleInputChange}
          disabled={this.isRunning}
          min={5}
          max={240}
        />

        <h1>{timeLeft}</h1>

        <button onClick={this.handleResumeClick}>{resumeButtonText}</button>
        <br />
        {this.isPaused && (
          <button onClick={this.handleResetClick}>Reset</button>
        )}
      </>
    );
  }
}

export default Countdown;
