import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import AddSubtasks from'./AddSubtasks';

const CreateTask = props => {


    const handleFormSubmission=event=>{

        event.preventDefault();

        let subtasksList= document.querySelectorAll('.subtasks');
        let div=document.getElementById('errors');
        div.innerHTML="";
       
        let Subtasks=[];
        function operations(){
            ++operationsCompleted;
            if(operationsCompleted==length){
            

                axios.post("api/v1/tasks",{
                    name:event.target.name.value,
                    description:event.target.description.value,
                    priority:event.target.priority.value,
                    subtasks:Subtasks
                }).then(
                    result=>{
                        props.handleUpdates();
                    }
                )
                .catch(err=>{
                    let errors=err.response.data.errors;
                    console.log(errors);

                    for (const property in errors) {
                        div.innerHTML="<h3>Error! </h3>";
                       div.innerHTML+=`<p>${errors[property].message}</p>`;
                      }

                  
                    for(let i=0;i<Subtasks.length;i++){
                        
                        axios.delete(`api/v1/subtasks/${Subtasks[i]._id}`)
                        .then(result=>
                            console.log(result)
                            )
                        .catch(err=>console.log(err))
                    
                    };
                })
            }
        }

        
        let operationsCompleted=0;
        let length=subtasksList.length;
        for(let i=0;i<subtasksList.length;i++){
             axios.post('api/v1/subtasks',{
                name:subtasksList[i].value
            }).then(
                result=>{
                    Subtasks.push(result.data.data);
                    operations();
                }
            )
            .catch(err=>{
                   
                    let error=err.response.data.errors.name.message;
                    div.innerHTML="<h3>Error! </h3>";
                    div.innerHTML+=`<p>${error}</p>`
                    // div.innerHTML=err;

                    }
            );
            
        }


      
    }


    return (<>
        

        <form onSubmit={event=>handleFormSubmission(event)}>
        <h2>Create Task</h2>
            

            <label>
                Name: 
                <input type="text" name="name" />
            </label>

            <label>
                Description: 
                <textarea name="description">
                </textarea>
            </label>

            
          

            <fieldset>
                <legend>Choose priority of task</legend>
                <label>
                    High<input type="radio" name="priority"value="high" />
                </label>
                <label>
                    Medium<input type="radio" name="priority" value="medium" />
                </label>
                <label>
                    Low<input type="radio" name="priority" value="low" />
                </label>

            </fieldset>
            <AddSubtasks />
            <button type="submit">Add Task</button>
            <div id="errors">

            </div>

        </form>

       
    </>);
}

export default CreateTask;