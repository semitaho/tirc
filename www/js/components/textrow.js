var Textrow = React.createClass({displayName: "Textrow",

    getClassName: function (text) {
        if (this.isJoinOrPart(text)) {
            return 'joinOrPart';
        }
        return '';
    },

    isJoinOrPart: function (input) {
        return input.indexOf("has joined #") !== -1
            || input.indexOf("has left #") !== -1;
    },

    isQuit: function (input) {
        return input.indexOf("has quit ") !== -1;

    },

    isMePart: function (input) {
        return input.indexOf(" * ") !== -1
            && input.indexOf(" has ") === -1
            && input.indexOf('<') === -1
            && input.indexOf('>') === -1;
    },


    isActionPart: function (input) {
        return input.indexOf("is known as") !== -1;
    },


    parseTime: function (elem) {
        return elem.match(/[0-9][0-9]:[0-9][0-9](:[0-9][0-9])?/g)[0];
    },


    format: function (parsedText) {
        var ytre = /(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/ig;
        var matchArray = parsedText.match(ytre);
        if (matchArray) {
            var that = this;
            $(matchArray).each(function (index, match) {
                if (Parser.isPic(match)) {
                    var imglink = that.formatImage(match);
                    parsedText = parsedText.replace(match, imglink);
                } else {
                    var link = that.formatLink(match);
                    parsedText = parsedText.replace(match, link);
                }
            });
        }
        return parsedText;
    },

    formatImage: function (match) {
        var imglink = '<a href="' + match + '" target="_blank"><img src="' + match + '" title="' + match + '" /></a>';
        return imglink;
    },

    formatLink: function (match) {
        var link = '<a href="' + match + '" target="_blank">' + match + '</a><div class="selector-wrapper"></div> ';
        return link;
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        var props = this.props;
        return !_.isEqual(props, nextProps);

    },


    rendercomment: function (item) {
        var textrowstyle = 'textrow comment';
        if (item.nick === Config.loadUser('taho')) {
            textrowstyle += ' own';
        }
        return (React.createElement("div", {className: textrowstyle}, 
            React.createElement("div", {className: "nick columns"}, item.nick), 
            React.createElement("div", {className: "nicktext"}, 
                React.createElement("div", {
                    className: "text", 
                    dangerouslySetInnerHTML: 
                    {
                        __html: item.line + '<span class="time"> - ' + item.time + '</span>'
                    }
                        }
                )
            )
        )
        )
    },

    renderme: function (item) {
        return ( React.createElement("div", {
            className: "textrow"}, 
            React.createElement("div", {
                className: "action", 
                dangerouslySetInnerHTML: 
                {
                    __html: item.line + '<span class="time"> - ' + item.time + '</span>'
                }
                    })
        ))
    },


    renderwelcome: function (item) {
        return ( React.createElement("div", {
            className: "textrow"}, 
            React.createElement("div", {
                className: "action", 
                dangerouslySetInnerHTML: 
                {
                    __html: item.nick + ' saapui paikalle ' + item.line + '<span class="time"> - ' + item.time + '</span>'
                }
                    
            })
        )
        )
    },

    renderaction: function (item) {
        return ( React.createElement("div", {
            className: "textrow"}, 
            React.createElement("div", {
                className: "star", 
                dangerouslySetInnerHTML: 
                {
                    __html: item.line + '<span class="time"> - ' + item.time + '</span>'
                }
                    
            })
        )
        )
    },

    renderquit: function (item) {
        return ( React.createElement("div", {
            className: "textrow"}, 
            React.createElement("div", {
                className: "quit"}, " ", item.nick, 
                
                "poistui" + ' ' +
                "kokonaan" + ' ' +
                "ircistä: ", 
                item.line, 
                
                "-", item.time
                )

        )
        )
    },
    renderjoin: function (item) {
        return ( React.createElement("div", {
            className: "textrow"}, 
            React.createElement("div", {
                className: "quit"}, item.nick, " saapui kanavalle - ", item.time)

        )
        )
    },

    renderpart: function (item) {
        return ( React.createElement("div", {
            className: "textrow"}, 
            React.createElement("div", {
                className: "quit"}, " ", item.nick, 
                
                "jätti" + ' ' +
                "kanavan - ", item.time
                )

        )
        )
    },
    render: function () {
        if (this['render' + this.props.elem.type]) {
            console.log('type is: '+this.props.elem.type);
            return this['render' + this.props.elem.type](this.props.elem);
        } else {
            console.log('ERROR! method: render' + this.props.elem.type + ' cannot be found, row: ' + JSON.stringify(this.props.elem));
            return null;
        }
        return(
        React.createElement("div", {
            className: "action"}, " ", this.props.elem, 
            
            React.createElement("span", {
                className: "time"}, " -", this.props.time
                
            )
        ) )
    },

    renderlogevent: function (item) {
        return (
        React.createElement("div", {
            className: "textrow logevent"}, " ", item.line
            
        ) );
    }

});