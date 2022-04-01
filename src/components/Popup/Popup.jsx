import React, { useEffect, useState } from 'react';
import './Popup.css'
const Popup = (props) => {
	let optionArray = [
		{value:'To Do', selected:((props.state.complete) == false ? true:false)},
		{value:'In progress', selected:((props.state.complete) == 'inProgress' ? true:false)},
		{value:'Complete', selected:((props.state.complete) == true ? true:false)},
	]
	let optionList;
	let defaultValue;
	if (optionArray){
		optionList = optionArray.map((item)=>{
				return(
					<option value={item.value}>{item.value}</option>
				)
		})
		defaultValue = optionArray.filter((item)=>{
			if(item.selected ==true){
				return item.value
			}
		})
	}
	useEffect(()=>{setOption(defaultValue[0].value)})
	let [option, setOption] = useState('')
	let [input, setInput] = useState({
		status:false,
		inputText: props.state.text,
		textarea:props.state.textarea,
	})
	return (props.trigger) ? (
		<div className='popup'>
			<div className="popup__outer" onClick={()=>props.setTrigger(false)}></div>
			<div className={`popup__inner ${(props.trigger) ? 'active' : ''}`}>
			{!props.children
			?  <div className="popup__block">
					<h1 className='popup__title' onClick={()=>setInput({...input, status:true})}>
						{(input.status)? <input type='text' value={input.inputText} onKeyDown={(e)=>{
						if(e.key == "Enter"){
							setInput({...input, inputText:input.inputText, status:false})
							props.changeText(props.state.id, input.inputText, 'text')
							props.state.text = input.inputText
						}
					}}
					onChange={(e)=>{
						setInput({...input, inputText: e.target.value})
					}}/> : props.state.text}
					</h1>
					<div className="popup__chStatus">
						<span>Status:</span>
						<select className="popup__select" value={option} onChange={(e)=>{props.changeStatus(props.state.id, e.target.value)
						setOption(e.target.value)}}>
							{optionList}
						</select>
					</div>
					<div className="popup__textarea">
						<textarea placeholder='Write something...' value={input.textarea} onChange={(e)=>{
							props.changeText(props.state.id, e.target.value, 'textarea')
							setInput({...input, textarea: e.target.value})
						}}>{props.state.textarea}</textarea>
					</div>
				</div>
			: props.children}
				<button className="popup__btn" onClick={()=>props.setTrigger(false)}>Close</button>
			</div>
		</div>
	) : '';
}

export default Popup;