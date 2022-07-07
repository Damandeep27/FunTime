import React from 'react';
import {useState,useEffect} from 'react';

const AddSubtasks = props => {

    const[allowedSubtasks,setAllowedSubtasks]=useState(1);

    const[subtasks,setSubtasks]=useState();

    const handleAllowedtasks=event=>{
        setAllowedSubtasks(event.target.value);
    }

    useEffect(function CreateSubtaskFields(){

        let fields=[];

        for(let i=0;i<allowedSubtasks;i++){
            fields.push(`subtask${i+1}`);
        }

        setSubtasks(fields);


    },[allowedSubtasks]);

    return (<>
        <h3>Add Subtasks</h3>
        <label>
            Select number of subtasks
            <input type="number" min="1" max="5" value={allowedSubtasks} onChange={event=>handleAllowedtasks(event)} />
        </label>
        {subtasks?

            <div id="subtasks">
                <h4>Subtasks:</h4>
               {subtasks.map((subtask,id)=>
                    <label key={id}>{id+1}.
                        <input type="text" name={subtask} className="subtasks"  />
                    </label>
                )}
            </div>
            :
            <div>Loading...</div>
        }
    </>);
}

export default AddSubtasks;