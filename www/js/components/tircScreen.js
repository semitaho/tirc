var TircScreen = React.createClass({displayName: "TircScreen",

    componentWillMount: function () {
        console.log('TircScreen: willMount');
    },

    render: function () {
        var dataall = this.props.connectdata.concat(this.props.currentdata);
        var id = 0;
        var visible = this.props.visible;
        var classStr = 'tirc_screen';

        return React.createElement("div", {ref: "screen", className: classStr},   dataall.map(function (item) {
            id++;
            return ( React.createElement(Textrow, {key: id, elem: item}) )
        }) )
    },

    componentDidMount: function () {
        console.log('TircScreen: didMount');
        var link = $(this.getDOMNode()).find('a').not($('.embed a'));
        var index = this.props.index;
        if (link.length > 0) {
            link.embedly({
                done: function () {
                    Resizer.resize(index);
                    TircState.onstatechange(TircState.setvisibility, true);
                }
            });

        }

    },

    shouldComponentUpdate: function (nextProps, nextState) {
        return true;
    },


    componentDidUpdate: function (prevProps, prevState) {
        console.log('tircScreen: on did update')
        var index = prevProps.index;
        console.log('TircScreen: didUpdate');
        var link = $(this.getDOMNode()).find('a').not($('.embed a'));
        /*
         if (link.length === 0) {
         Resizer.resize(index);
         TircState.onstatechange(TircState.setvisibility, true);

         }
         else {
         link.embedly({
         done: function () {
         Resizer.resize(index);
         TircState.onstatechange(TircState.setvisibility, true);
         }
         });
         }
         */
        return true;
    }


});

