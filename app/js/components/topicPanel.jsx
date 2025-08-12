
import Userselect from './userselect.jsx';
import Nickpanel from './nickpanel.jsx';

const TopicPanel = ({topic, users, receiveUsers, tircusers, userselect, changeUser }) => {
    var id = 'tab_panel_0';
    return <div className="row panel-title">
                <div className="col-md-12 full-width">
                  <div className="row topic-panel">
                    <div className="col-md-4 col-sm-10 col-xs-9 topic">
                        <h3>{topic}</h3>
                    </div>
                    <div className="col-md-6 hidden-xs hidden-sm overflow-scroll">
                     <Nickpanel users={users} receiveUsers={receiveUsers} tircusers={tircusers}/>
                    </div>
                    <div className="col-md-2 col-sm-2 col-xs-3">
                      <Userselect {...userselect} changeUser={changeUser}/>
                    </div>
                  </div>
                </div>
            </div>
  }
export default TopicPanel;
