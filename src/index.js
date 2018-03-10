import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import UnstyledApp from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter} from 'react-router-dom';

const App = styled(UnstyledApp)`
  margin: 0;
  padding: 0;
  font-family: sans-serif;
`;

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
