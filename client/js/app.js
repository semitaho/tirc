import backend  from './services/TircBackend.js';
import geoservice from './services/GeoService.js';
import config from './services/ConfigService.js';
import state from './TircStore.js';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import tircApp from './reducers/tircreducer';
import {render} from 'react-dom';

// tilanmuutos kuuntelija
$(document).on('statechange', function (event, eventAction, data) {
  state.onstatechange(state[eventAction], data);
});

let tircContent = document.getElementById('tirc_content');
import Tirc from './components/tirc.jsx';
let store = createStore(tircApp);
render(<Provider store={store}><Tirc /></Provider>, tircContent);

/*

 // backend kuuntelija
 $(document).on('backendcall', function (event, method, data1, data2, data3, callback) {
 if (data1 && data2 && data3) {
 console.log('data3', callback);
 backend[method](data1, data2, data3, callback);

 }

 else if (data1 && data2) {
 backend[method](data1, data2, callback);
 } else {
 backend[method](data1, callback);

 }
 });
 $(document).trigger('statechange', ['initload', true]);

 geoservice.init()
 .then(geoservice.reverseGeocode)
 .then(function (location) {
 return backend.connect(config.loadUser(), location);
 }).catch(function (err) {
 console.log('on err', err);
 return backend.connect(config.loadUser());
 });
 */

