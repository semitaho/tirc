import config from './services/ConfigService.js';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import tircApp from './reducers/tircreducer';
import {render} from 'react-dom';
import React from 'react';
import Tirc from './components/tirc.jsx';

let tircContent = document.getElementById('tirc_content');
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware // lets us dispatch() functions
)(createStore);

let store = createStoreWithMiddleware(tircApp);
config.loadPhrases().then(phraseObjects => {
  let phraseNames = phraseObjects.map(phrase => phrase.name);
  let index = Math.floor(Math.random() * phraseNames.length);
  render(<Provider store={store}><Tirc phraseindex={index} phrases={phraseNames}/></Provider>, tircContent);

});

