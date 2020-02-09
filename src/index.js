import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';

import 'semantic-ui-css/semantic.min.css'

import App from './App';
import ScrollToTop from './pageComponents/scrollToTop'
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(

    <BrowserRouter>
      <ScrollToTop>
          <App />
          <style>
            @import url('https://fonts.googleapis.com/css?family=Open+Sans|Signika|Bowlby+One+SC&display=swap');
          </style>
        </ScrollToTop>
    </BrowserRouter>,

document.getElementById('root'));
