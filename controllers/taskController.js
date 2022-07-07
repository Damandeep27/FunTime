const Task=require('../models/Task.js');

const postTask=(req,res)=>{
    let task = new Task(req.body);
    
    task.save(error=>{
        if(error)
            res.status(500).json(error);

           
        else{
            res.set('content-location', `/api/v1/tasks/${task._id}`);

            res.status(201).json({
               data:task,
               url:`/api/v1/tasks/${task._id}`
           });
        }
    })
    

};

const getTask=(req,res)=>{
     Task.findOne({"_id":req.params.id }).exec()
    .then(results=>{
        res.status(200).json(results);
    }
        
    )
    .catch(error=>res.status(500).json(error));
};

const getTasks=(req,res)=>{
    
     Task.find({}).exec()
    .then(results=>{
        res.status(200).json(results);
    }
        
    )
    .catch(error=>res.status(500).send(error));
};

const updateTask=(req,res)=>{
    Task.updateOne( {"_id":req.params.id },
                    {
                    $set: {
                        subtasks:req.body
                    }
                    
    })
    .then(result=>res.send(result))
    .catch(error=>res.status(500).send(error));

}

const deleteTask=(req,res)=>{
    Task.deleteOne( {"_id":req.params.id } )
    .then(result=>
        res.status(200).json(result)
    )
    .catch(error=>res.status(500).send(error));
}



module.exports={
    getTask,
    getTasks,
    postTask,
    updateTask,
    deleteTask
}