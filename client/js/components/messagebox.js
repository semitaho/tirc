var Messagebox = React.createClass({


    say: function () {
        TircBackend.say(Config.loadUser('taho'), this.props.text, this.saysuccess);
        TircState.onstatechange(TircState.settext, '');
    },

    saysuccess: function () {
        console.log('success said.');
    },

    componentWillMount: function () {
        console.log('messagebox: willmount');
        GeoService.init(this.geosuccess, this.geoerror);
    },

    componentDidMount: function () {
        this.typestate = {time: new Date(), state: 'connected'};
        this.id = setInterval(this.onstateupdate, 500);
    },

    componentWillUnmount: function () {
        clearInterval(this.id);
    },

    onstateupdate: function () {
        if (this.typestate.state === 'typing' || this.typestate.state === 'fixing') {
            var currentTime = new Date();
            var millisecondsDiff = (currentTime.getTime() - this.typestate.time.getTime());
            if (millisecondsDiff > 1500) {
                this.statechange('idle');
            }
        } else if (this.typestate.state === 'connected') {
            var currentTime = new Date();
            var millisecondsDiff = (currentTime.getTime() - this.typestate.time.getTime());
            if (millisecondsDiff > 60000) {
                this.statechange('idle');
            }
        }
    },


    geosuccess: function (location) {
   //     TircBackend.sayWelcome(Config.loadUser('taho'), location, this.successWelcome);
    },

    geoerror: function () {

    },

    successWelcome: function () {
        console.log('welcome succeeded');
        GeoService.watch(this.watchSuccess);


    },

    watchSuccess: function (location) {
        TircBackend.updateLocation(Config.loadUser('taho'), location);
    },

    onPress: function (event) {
        if (event.which === 13) {
            this.say();
        } else if (event.which === 8 || event.which === 46) {
            this.statechange('fixing');
        } else {
            this.statechange('typing');
        }
    },

    statechange: function (state) {
        var previousState = this.typestate.state;
        this.typestate = {time: new Date(), state: state};
        if (state !== previousState) {
            TircBackend.changeState(Config.loadUser(), state);
        }
    },

    onBlur: function (event) {
        console.log('bluur');
        this.statechange('idle');
    },

    updateText: function (event) {
        console.log(TircState);
        TircState.onstatechange(TircState.settext, event.target.value);
    },
    render: function () {
        return (
            <div>
                <div className="attach">
                    <button id="attach">Liitä kuva</button>
                </div>
                <div>
                    <input type="text" name="text" value={this.props.text} onChange={this.updateText}  onBlur={this.onBlur} id="textline" className="message_box"
                        placeholder="say something..."  onKeyUp={this.onPress}></input>
                </div>
            </div>
        );
    }
});

//React.render(<Messagebox backend={TircBackend} />, document.getElementById('action_panel'));