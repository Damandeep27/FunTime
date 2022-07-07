import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';
import Subtasks from './Subtasks';


const ToDo = props => {

    // const [pendingTasks, setPendingTasks]=useState([]);

   
    const [count, setCount]=useState(0);

    const [tasks, setTasks]= useState([]);

    const renderSubTasks = (subtasks,id)=><Subtasks subtasks={subtasks} 
    id={id} handleUpdates={props.handleUpdates}/>
  

    

    useEffect(function updateTaskList(){

            axios.get('/api/v1/tasks')
            .then(result=>{
                if(result!=undefined){
                    setTasks(result.data);
                    setCount(result.data.length);
                }
                    
            })
            .catch(err=>console.log(err));
        

    },[props.updated])

    return (<>
         <h1>My Tasks</h1>
      {tasks.length!=0?

          <div>

              <div id="signals">

              <div><div id="red"></div>High priority</div> 
              <div><div id="orange"></div> Medium priority</div> 
              <div><div id="yellow"></div> Low priority</div> 

              </div>

            

            <div id="tasks">
                
                {tasks.map((task,id)=>

                   <Task key={id}    renderSubTasks={renderSubTasks} task={task} />
                    
                )}

               
                

            </div>
          </div>
            
            
            
            :
          
           <div id="test" >
               <p>No Pending Task!</p>

           </div>
       }
        
        
        
    </>);
}

export default ToDo;