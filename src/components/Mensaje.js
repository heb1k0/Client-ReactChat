import React from "react";

export default function Mensaje(props) {

  const userStyle = {
  };

  return props.send === false ? (
    <div id={props.id} className="conversation p-2">
      <div className="chat p-2">
        <div className="row">
          <div className="col-md-12" style={userStyle}>
            {props.user}
          </div>
        </div>
        <div className="send">{props.mensaje}</div>
      </div>
    </div>
  ) : (
    <div id={props.id} className="conversation p-2">
      <div className="chat p-2">
        <div className="row">
          <div className="col-md-12 text-right" style={userStyle}>
            {props.user}
          </div>
        </div>
        <div className="d-flex align-items-end flex-column">
          <div className="recive text-right">{props.mensaje}</div>
        </div>

      </div>
    </div>
  );
}
