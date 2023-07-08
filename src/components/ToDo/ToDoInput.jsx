import React from "react";
import s from "./ToDo.module.css";
const ToDoInput = (props) => {
   return (
      <div>
         <input
            type="text"
            className={s.todo__input}
            value={props.value}
            onChange={(e) => {
               props.updateInput(e.target.value);
            }}
            onKeyDown={(e) => {
               if (e.key === "Enter") {
                  props.setToDo(false);
                  if (props.value.length !== 0) {
                     props.updateState(props.value);
                  }
               }
            }}
         />
      </div>
   );
};

export default ToDoInput;
