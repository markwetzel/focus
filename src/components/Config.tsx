import * as React from 'react';

interface ConfigProps {
  onConfigClose: React.MouseEventHandler;
}

interface ConfigState {}

class Config extends React.Component<ConfigProps, ConfigState> {
  state = {};

  render() {
    return (
      <div id="config">
        <input
          type="number"
          name="pomodoro-length"
          id="pomodoro-length"
          placeholder="Pomodoro length (in minutes)"
        />
        <input
          type="number"
          name="short-break-length"
          id="short-break-length"
          placeholder="Short break length (in minutes)"
        />
        <input
          type="number"
          name="long-break-length"
          id="long-break-length"
          placeholder="Long break length (in minutes)"
        />
        <input
          type="number"
          name="long-break-delay"
          id="long-break-delay"
          placeholder="Long break delay (in pomodoros)"
        />
        <input
          type="checkbox"
          name="auto-start-pomodoros"
          id="auto-start-pomodoros"
        />
        <label htmlFor="auto-start-pomodoros">Auto-start pomodoros</label>
        <input
          type="checkbox"
          name="auto-start-breaks"
          id="auto-start-breaks"
        />
        <label htmlFor="auto-start-breaks">Auto-start breaks</label>
        <input
          type="number"
          name="daily-goal"
          id="daily-goal"
          placeholder="Daily goal (in pomodoros)"
        />

        <button onClick={this.props.onConfigClose}>Close</button>
      </div>
    );
  }
}

export default Config;
