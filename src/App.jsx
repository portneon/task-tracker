import React, { useState } from "react";
import './App.css';

function App() {
    const [inputValue, setInputValue] = useState(""); 
    const [tasks, setTasks] = useState([]); 

    function handleChange(e) {
        setInputValue(e.target.value); 
    }

    function addTask() {
        if (inputValue.trim() === "") return;
        setTasks([inputValue, ...tasks]); 
        setInputValue("");
    }
    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    return (
        <div className="main-container">
            <div className="firstdiv">
                <h1>HEY! These are the work left</h1>

                <div className="search">
                    <input className="input"
                        placeholder="Add your task Here!"
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                    />
                    <button className="btn1" onClick={addTask}>Add task</button>
                </div>

                <div className="tasks">
                    
                        {tasks.map((task,index) => (
                            <div style={{ display: "flex" }}>
                                <div style={{display:"flex"}}><li  className="task">
                                    {task}</li>
                                    <button style={{display:"flex",borderRadius:"10px",height:"30px",width:"30px",marginTop:"20px",backgroundColor:"black",color:"white"}}onClick={() => deleteTask(index)}>✓</button>
                                </div>
                            
                                
                                
                                
                            </div>
                        ))}
                 
                </div>
            </div>
        </div>
    );
}

export default App;
