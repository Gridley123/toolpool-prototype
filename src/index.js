import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter} from 'react-router-dom';

const StyledApp = styled(App)`
  margin: 0;
  padding: 0;
  font-family: sans-serif;
`;

ReactDOM.render(
  <BrowserRouter>
    <StyledApp/>
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
