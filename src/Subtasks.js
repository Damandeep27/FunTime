import React from 'react';
import {useState, useEffect} from 'react';
import axios from'axios';


const Subtasks = props => {

 
    const removeSubtask=(event,id)=>{
         
        let taskId=id;
        let subtaskId= event.target.value;
    

        
            document.getElementById(subtaskId).className="delete";
        
            
        
      

        
        let updatedSubTasksList=[];
        for(let i=0;i<props.subtasks.length;i++){
  
          
            if(props.subtasks[i]._id==subtaskId){
               continue;
            }


              
  
             updatedSubTasksList.push(props.subtasks[i]);

        }


        axios.delete(`api/v1/subtasks/${subtaskId}`)
             .then(result=>{
                 console.log(result);
                 
             }).then(
                 axios.put(`api/v1/tasks/${taskId}`,updatedSubTasksList)
                 .then(result=>{
                     //console.log(result);
    
                     props.handleUpdates();
                    }
                  )
             )
             .catch(err=>console.log(err));
             
    
    }

    const deleteTask=(event)=>{

        let id=event.target.value;

        axios.delete(`api/v1/tasks/${id}`)
        .then(result=>{
            //console.log(result);
            props.handleUpdates();
            
        })
        .catch(err=>console.log(err));

        

    }
  
    return (<>
        
        {props.subtasks.length!=0?
            
            props.subtasks.map((subtask,id)=><li key={id}><label id={subtask._id} className=""><input type="checkbox"   name={subtask._id} onClick={event=>removeSubtask(event,props.id)} value={subtask._id}/>{subtask.name}</label></li>)
        
        :
        <div>
               <p>Hurrah! You completed the all required tasks.</p>
               <button onClick={event=>deleteTask(event)} value={props.id}>Delete</button> 
               
            
        </div>
        
        }
        
    </>);
}

export default Subtasks;
