import React from "react";

const PhantomRow = ({nick, state, text}) => {

  var str = nick;
  var clazz = "col-md-9 col-md-offset-3 ";
  if (state === "fixing") {
    str += " korjaa...";
    clazz += "fixing";
  } else {
    clazz += "typing";
    str += " kirjoittaa...";
  }
  return (
    <div className="row">
      <div className={clazz}>{str}</div>
    </div>
  );
};

export default PhantomRow;
