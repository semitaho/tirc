
const TabHeader = () => {
    let badgeStr = '';
    let className = 'tab btn active';
    return (<div className="tabs col-md-11 col-xs-9 col-sm-9 btn-group">
                <a className={className} href="#">{this.props.name}</a>
            </div>);

  }
export default TabHeader;
