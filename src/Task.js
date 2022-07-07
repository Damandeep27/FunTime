import React from 'react';
import {useState, useEffect} from 'react';
import Subtasks from './Subtasks';


const Task = props => {

 

    return (<>
        <div id="task" className={props.task.priority}>
            <h2>{props.task.name}</h2>
            <p>{props.task.description}</p>
            <ul >

                {props.renderSubTasks(props.task.subtasks,props.task._id)}
                
                
            </ul>
            
        </div>
        
    </>);
}

export default Task;

