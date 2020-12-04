import React, { useState } from "react";
import { Add } from "@material-ui/icons";
import { Fab, Zoom } from "@material-ui/core";

function CreateArea(props) {
  const [visible, setVisible] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    // setVisible(false);
    event.preventDefault();
  }

  function handleClick() {
    setVisible(true);
  }
  return (
    <div>
      <form className="create-note">
        {visible && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onClick={handleClick}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={visible ? "3" : "1"}
        />
        <Zoom in={visible}>
          <Fab onClick={submitNote}>
            <Add />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
