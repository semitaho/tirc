import reducer from './../../../js/reducers/tabsreducer';
import assert from 'assert';

describe('tabsReducerTests', ()=>{

  it('testsChangingTopic', () =>{

    let initialState = [{
      name: 'tirc',
      mainpanel: {
        screenloaded: true,
        topic: 'tIrc redux is here',
        users: []
      }
    }, {name: 'mcw'}];

    let expectedState = [{
      name: 'tirc',
      mainpanel: {
        screenloaded: true,
        topic: 'topic changed',
        users: []
      }
    }, {name: 'mcw'}];

    let action = {
      type: 'RECEIVE_TOPIC',
      topic: 'topic changed'
    };


    assert.deepEqual(reducer(initialState, action), expectedState);



  });

});