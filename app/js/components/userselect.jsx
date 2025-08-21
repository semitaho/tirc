import { useEffect, useState } from "react";
import ConfigService, { saveUser } from "../services/ConfigService";
import { useData } from "../hooks/firebase.hook";
const Userselect = ({ users }) => {
  const [chosen, setChosen] = useState(ConfigService.loadUser());
  const onchange = (event) => {
    var newnick = event.target.value;
    saveUser(newnick);
    setChosen(newnick);
  };
  const nicks = [
    { name: "Aino" },
    { name: "Toni" },
    { name: "Andon" },

    { name: "Hilma" },
    { name: "Taho Ohjelmistopalvelut Oy" },
    { name: "Hanna" },
  ];
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
