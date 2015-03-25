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
        console.log('TircScreen: didMount');
        var link = $(this.getDOMNode()).find('a').not($('.embed a'));

        if (link.length === 0) {
            console.log('no sizes...');
            Resizer.resize();
        } else {
            link.embedly({
                done: function () {
                    Resizer.resize();
                }
            });
        }

    },

    shouldComponentUpdate: function (nextProps, nextState) {
        var currentDataPrevious = this.props.currentdata;
        var currentDataNext = nextProps.currentdata;
        if (currentDataNext.length > currentDataPrevious.length) {
            return true;
        }
        return false;

    },


    componentDidUpdate: function (prevProps, prevState) {
        console.log('TircScreen: didUpdate');
        var link = $(this.getDOMNode()).find('a').not($('.embed a'));
        if (link.length === 0) {
            console.log('links: ' + link.length);
            Resizer.resize();

        }
        else {
            link.embedly({
                done: function () {
                    Resizer.resize();
                }
            });
        }

        return true;
    }


});

