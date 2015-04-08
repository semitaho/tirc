var TircDispatcher = (function () {
    _listencallbacks = {
        onconnectfail: function () {
            console.log('error connecting...');
            TircState.onstatechange();
        }

    };

    var registerCallback = function (id, cb) {
        console.log('registered callback - ' + id);
        _callbacks[id] = cb;
    };




    var onconnect = function (data) {



    };



    var _cb = function (key) {
        return _callbacks[key];
    };

    var _dispatch = function (id) {
        console.log('dispatching callback: ' + id);
        _callbacks[id]();
    };



    return {
        cb: _cb,
        dispatch: _dispatch,
        onconnectsuccess: onconnect
    };

})();