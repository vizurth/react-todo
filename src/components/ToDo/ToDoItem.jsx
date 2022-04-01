import React from "react";
import s from "./ToDo.module.css";
import noCompleteDot from "../assets/noComplete.svg";
import CompleteDot from "../assets/Complete.svg";
const ToDoItem = (props) => {
	console.log(props.state.textarea)
   return (
      <div
         className={s.todo__column}
         onClick={()=>{
				props.changeTrigger(props.state)
			}}
      >
         <div className={s.todo__task}>{props.text}</div>
      </div>
   );
};

export default ToDoItem;
