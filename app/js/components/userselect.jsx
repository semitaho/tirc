import { useEffect, useState } from "react";
import { saveUser } from "../services/ConfigService";
import { useData } from "../hooks/firebase.hook";
const Userselect = ( { users, chosen }) => {
  const onchange = (event) => {
    var newnick = event.target.value;
    saveUser(event.target.value);
    this.props.changeUser(newnick);
  };
  const [ nicks ] = useData("nicks");
  console.log("Nicks in Userselect:", nicks);
  return (
    


    <div id="userselect" className="text-right">
      <select
        className="form-control input-sm"
        name="userlist"
        onChange={onchange}
        value={chosen}
      >
        {nicks.map((user) => {
          return <option key={user.name}>{user.name}</option>;
        })}
      </select>
    </div>
  );
};

export default Userselect;
