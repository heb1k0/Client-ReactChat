import React from "react";

export default function Mensaje(props) {


  const userStyle = {
    fontFamily: "Helvetica",
    fontWeight: "bold",
    textTransform: "uppercase",
  };
  return props.send === true ? (
    <div id={props.id} className="conversation p-2">
      <div className="chat bg-white p-2">
        <div className="row">
          <div className="col-md-12" style={userStyle}>
            {props.user}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">{props.mensaje}</div>
        </div>
      </div>
    </div>
  ) : (
    <div id={props.id} className="conversation p-2">
      <div className="chat bg-white p-2">
        <div className="row">
          <div className="col-md-12 text-right" style={userStyle}>
            {props.user}
          </div>
        </div>
        <div className="row text-right">
          <div className="col-md-12">{props.mensaje}</div>
        </div>
      </div>
    </div>
  );
}
