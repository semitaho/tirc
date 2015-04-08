var Userselect = React.createClass({displayName: "Userselect",

    onchange: function (event) {
        var oldnick = Config.loadUser('taho');
        var newnick = event.target.value;
        Config.saveUser(event.target.value);
        TircState.onstatechange(TircState.setnick,newnick);
        TircBackend.changeNick(oldnick, newnick);
    },

    componentDidMount: function () {
        Config.loadFromDb(this.onconfigloaded);
    },

    onconfigloaded: function (data) {
        TircState.onstatechange(TircState.setusersdata,data);



    },

    render: function () {
        var that = this;
        return (
            React.createElement("div", {id: "userselect", className: "cell"}, 
                React.createElement("div", {className: "current_user"}, 
                    React.createElement("select", {name: "userlist", onChange: this.onchange, value: this.props.chosen}, 
					this.props.users.map(function (user) {
                        return (React.createElement("option", {key: user}, user))
                    })
                        
                    )
                )
            ))
    }
});


//React.render(<Userselect />, document.getElementById('userselect'));

