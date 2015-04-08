console.log('erkki...');
var props = TircState.getInitialState();

TircBackend.connect(Config.loadUser());
// this.props.backend.connect(, this.onconnect, this.onconnecterror);


//React.render(<Tirc data={props} />, document.getElementById('tirc_content'));