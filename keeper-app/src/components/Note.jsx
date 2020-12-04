import { Delete } from "@material-ui/icons";
// import DeleteIcon from "@material-ui/icons/Delete";

import React from "react";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <Delete />
      </button>
    </div>
  );
}

export default Note;
