var Userselect = React.createClass({

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
            <div id="userselect" className="cell">
                <div className="current_user">
                    <select name="userlist" onChange={this.onchange} value={this.props.chosen}>
					{this.props.users.map(function (user) {
                        return (<option key={user}>{user}</option>)
                    })
                        }
                    </select>
                </div>
            </div>)
    }
});


//React.render(<Userselect />, document.getElementById('userselect'));

