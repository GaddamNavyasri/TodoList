import React, { useState } from 'react'

function TodoListPractice() {
    const[todoList,setTodoList]=useState([])
    const[inputList,setInputList]=useState('')

    const addValues = ()=>{
        if(inputList.trim()){
            setTodoList([...todoList,{text:inputList,index:Date.now()}]);
            setInputList('')
        }
    }

    const deleteList=(id)=>{
        setTodoList(todoList.filter(todoList=> todoList.id !== id))
    }
    
  return (
    <>
    <h1>Todo List</h1>
    <input placeholder="Add a new todo" onChange={(e)=>setInputList(e.target.value)} type="text" value={inputList}/>
    <button onClick={addValues}>Add</button>
    <div>
        <ul>
       {todoList.map((item)=>(
             <li>
             {item.text}
             <button onClick={()=>deleteList(todoList.id)}>Delete</button>
         </li>
       ))}
       </ul>
    </div>
    </>
  )
}

export default TodoListPractice