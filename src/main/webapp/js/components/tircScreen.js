var TircScreen = React.createClass({

    componentWillMount: function () {
        console.log('TircScreen: willMount');
    },

    render: function () {
        var dataall = this.props.connectdata.concat(this.props.currentdata);
        var id = 0;
        return <div ref="screen" className="tirc_screen">{  dataall.map(function (item) {
            id++;
            return ( <Textrow key={id}  elem={item}  /> )
        }) }</div>
    },

    componentDidMount: function () {
        var index = this.props.index;
        console.log('TircScreen: didMount');
        var link = $(this.getDOMNode()).find('a').not($('.embed a'));
        var index = this.props.index;
        if (link.length === 0) {
            console.log('no sizes...');
            Resizer.resize(index);
        } else {
            link.embedly({
                done: function () {
                    Resizer.resize(index);
                }
            });
        }

    },

    shouldComponentUpdate: function (nextProps, nextState) {
        return true;
    },


    componentDidUpdate: function (prevProps, prevState) {
        var index = prevProps.index;

        console.log('TircScreen: didUpdate');
        var link = $(this.getDOMNode()).find('a').not($('.embed a'));
        if (link.length === 0) {
            console.log('links: ' + link.length);
            Resizer.resize(index);

        }
        else {
            link.embedly({
                done: function () {
                    Resizer.resize(index);
                }
            });
        }

        return true;
    }


});

