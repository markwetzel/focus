import * as React from 'react';
import { kebabCaseToCamelCase } from '../utils';

interface ConfigProps {
  countdownSeconds: number;
  onChangeCountdownSeconds(event: React.ChangeEvent<HTMLInputElement>): void;
  onConfigClose: React.MouseEventHandler;
  onClose(value: number): void;
}

interface ConfigState {
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakDelay: number;
  autoStartPomodoros: boolean;
  autoStartBreaks: boolean;
  dailyGoal: number;
}

class Config extends React.Component<ConfigProps, ConfigState> {
  // https://stackoverflow.com/questions/52748553/how-to-correctly-set-initial-state-in-react-with-typescript-without-constructor
  public readonly state: Readonly<ConfigState> = {
    pomodoroDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 10,
    longBreakDelay: 4,
    autoStartPomodoros: false,
    autoStartBreaks: false,
    dailyGoal: 2,
  };

  componentDidMount() {
    try {
      const configValuesJson = localStorage.getItem('config');
      const configValues = JSON.parse(configValuesJson);

      this.setState(() => ({ ...configValues }));
    } catch (error) {
      // Load the state defaults if there's an error parsing
      console.log(error);
    }
  }

  handleChangeCountdownSeconds = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // const countdownSeconds = parseInt(event.target.value);

    const { name, type, value: strValue, checked } = event.target;

    const value = parseInt(strValue);
    console.log(name, value, checked);

    const newName = kebabCaseToCamelCase(name);

    const newState = {};

    newState[newName] = type === 'checkbox' ? checked : value;

    this.setState(newState);

    // this.props.onChangeCountdownSeconds;
  };

  componentWillUnmount() {
    this.writeConfig();

    this.props.onClose(this.state.pomodoroDuration);
  }

  writeConfig() {
    const output = JSON.stringify(this.state);
    localStorage.setItem('config', output);
  }

  render() {
    return (
      <div id="config">
        <input
          id="pomodoro-duration"
          name="pomodoro-duration"
          onChange={this.handleChangeCountdownSeconds}
          placeholder="Pomodoro duration (in minutes)"
          type="number"
          value={this.state.pomodoroDuration}
        />
        <input
          type="number"
          name="short-break-duration"
          id="short-break-duration"
          onChange={this.handleChangeCountdownSeconds}
          placeholder="Short break duration (in minutes)"
          value={this.state.shortBreakDuration}
        />
        <input
          type="number"
          name="long-break-duration"
          id="long-break-duration"
          onChange={this.handleChangeCountdownSeconds}
          placeholder="Long break duration (in minutes)"
          value={this.state.longBreakDuration}
        />
        <input
          type="number"
          name="long-break-delay"
          id="long-break-delay"
          onChange={this.handleChangeCountdownSeconds}
          placeholder="Long break delay (in pomodoros)"
          value={this.state.longBreakDelay}
        />
        <input
          type="checkbox"
          name="auto-start-pomodoros"
          id="auto-start-pomodoros"
          onChange={this.handleChangeCountdownSeconds}
          checked={this.state.autoStartPomodoros}
        />
        <label htmlFor="auto-start-pomodoros">Auto-start pomodoros</label>
        <input
          type="checkbox"
          name="auto-start-breaks"
          id="auto-start-breaks"
          onChange={this.handleChangeCountdownSeconds}
          checked={this.state.autoStartBreaks}
        />
        <label htmlFor="auto-start-breaks">Auto-start breaks</label>
        <input
          type="number"
          name="daily-goal"
          id="daily-goal"
          onChange={this.handleChangeCountdownSeconds}
          placeholder="Daily goal (in pomodoros)"
          value={this.state.dailyGoal}
        />

        <button onClick={this.props.onConfigClose}>Save</button>
      </div>
    );
  }
}

export default Config;
