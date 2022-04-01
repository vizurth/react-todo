import React, { useState } from "react";
import Popup from "../Popup/Popup";
import s from "./ToDo.module.css";
import ToDoItem from "./ToDoItem";
import Plus from "../assets/plus.svg";
import ToDoInput from "./ToDoInput";
import "./ToDo.css";
const ToDo = (props) => {
   let [state, handleChange] = useState({
      inputText: "",
      toDoList: [
         { id: 1, text: "First Task", complete: false, textarea:'' },
         { id: 2, text: "Second Task", complete: false, textarea:'' },
         { id: 3, text: "inProgress", complete: "inProgress", textarea:'' },
         { id: 4, text: "Complete Task", complete: true, textarea:'' },
      ],
   });
   let [trigger, setTrigger] = useState({
      status: false,
      toDo: {
         id: null,
         text: "",
         complete: null,
			textarea:''
      },
   });
   let [newTodo, setToDo] = useState(false);
   let updateState = (text) => {
      handleChange({
         ...state,
         inputText: "",
         toDoList: [
            ...state.toDoList,
            {
               id: state.toDoList.length + 1,
               text: text,
               complete: false,
            },
         ],
      });
   };
   let updateInput = (text) => {
      handleChange({ ...state, inputText: text });
   };
   let changeTrigger = (state) => {
      if (state == true) {
         setTrigger({ ...trigger, status: true });
      } else if (state == false) {
         setTrigger({ ...trigger, status: false });
      } else {
         setTrigger({
            ...trigger,
            status: true,
            toDo: {
               id: state.id,
               text: state.text,
               complete: state.complete,
               textarea: state.textarea,
            },
         });
      }
   };
	let changeStatus = (id, status) => {
		handleChange({
         ...state,
         toDoList: state.toDoList.map((item) => {
            if (item.id == id && status == 'To Do') {
               item.complete = false;
               return item;
            } else if (item.id == id && status == 'In progress') {
               item.complete = 'inProgress';
               return item;
            } else if (item.id == id && status == 'Complete') {
               item.complete = true;
               return item;
            } else {
					return item
				}
         }),
      });
	}
	let changeText = (id, text, type) => {
		handleChange({
         ...state,
         toDoList: state.toDoList.map((item) => {
            if (item.id == id && type == 'text') {
               item.text = text
               return item;
				} else if (item.id == id && type == 'textarea') {
               item.textarea = text
               return item;
				} else {
					return item
				}
         }),
      });
	}
   let toDoArrayNew;
   if (state.toDoList) {
      toDoArrayNew = state.toDoList.map((item) => {
         if (item.complete == false) {
            return (
               <ToDoItem
                  state={item}
                  text={item.text}
                  id={item.id}
                  complete={item.complete}
                  changeTrigger={changeTrigger}
               />
            );
         }
      });
   }
   let toDoArrayInProgress;
   if (state.toDoList) {
      toDoArrayInProgress = state.toDoList.map((item) => {
         if (item.complete == "inProgress") {
            return (
               <ToDoItem
                  state={item}
                  text={item.text}
                  id={item.id}
                  complete={item.complete}
                  changeTrigger={changeTrigger}
               />
            );
         }
      });
   }
   let toDoArrayComplete;
   if (state.toDoList) {
      toDoArrayComplete = state.toDoList.map((item) => {
         if (item.complete == true) {
            return (
               <ToDoItem
                  state={item}
                  text={item.text}
                  id={item.id}
                  complete={item.complete}
                  changeTrigger={changeTrigger}
               />
            );
         }
      });
   }
   return (
      <div className={s.todo}>
         <img className="todo__plus" src={Plus} onClick={() => setToDo(true)} />
         <div className="todo__block">
            <div className="todo__list todo__list-new">
               <div className="todo__status todo__status-doesnt">To Do</div>
               {newTodo ? (
                  <ToDoInput
                     value={state.inputText}
                     updateInput={updateInput}
                     setToDo={setToDo}
                     updateState={updateState}
                  />
               ) : (
                  ""
               )}
               <div className={s.todo__bloc}>{toDoArrayNew}</div>
            </div>
            <div className="todo__list todo__list-inProgress">
               <div className="todo__status todo__status-inProgress">
                  In progress
               </div>
               <div className={s.todo__bloc}>{toDoArrayInProgress}</div>
            </div>
            <div className="todo__list todo__list-complete">
               <div className="todo__status todo__status-complete">
                  Complete
               </div>
               <div className={s.todo__bloc}>{toDoArrayComplete}</div>
            </div>
         </div>
         {trigger.status == true
			?<Popup
			 	changeStatus={changeStatus}
				changeText={changeText}
            trigger={trigger.status}
            setTrigger={changeTrigger}
            state={trigger.toDo}
         />
			:''}
      </div>
   );
};
export default ToDo;
