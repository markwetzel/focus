import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import './style/main.less';

const Index = () => {
  return <App />;
};

ReactDOM.render(<Index />, document.getElementById('root'));
