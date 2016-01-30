import backend  from './services/TircBackend.js';
import geoservice from './services/GeoService.js';
import config from './services/ConfigService.js';
import state from './TircStore.js';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import $ from 'jquery';


import tircApp from './reducers/tircreducer';
import {render} from 'react-dom';
import React from 'react';
import Tirc from './components/tirc.jsx';

let tircContent = document.getElementById('tirc_content');
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware // lets us dispatch() functions
)(createStore);

let store = createStoreWithMiddleware(tircApp);

render(<Provider store={store}><Tirc /></Provider>, tircContent);

/*

 
 geoservice.init()
 .then(geoservice.reverseGeocode)
 .then(function (location) {
 return backend.connect(config.loadUser(), location);
 }).catch(function (err) {
 console.log('on err', err);
 return backend.connect(config.loadUser());
 });
 */

