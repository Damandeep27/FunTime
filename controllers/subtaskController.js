const {Subtask}=require('../models/Subtask.js');

const postSubtask=(req,res)=>{
    let subtask = new Subtask(req.body);
    
    subtask.save(
        error=>{
            if(error){
                res.status(500).json(error);
                console.log(error);
                
            }else{
                res.set('content-location', `/api/v1/subtasks/${subtask._id}`);

                res.status(201).json({
                    data:subtask,
                    url:`/api/v1/subtasks/${subtask._id}`
                });
            }
        });
    
    

};

const getSubtask=(req,res)=>{
     Subtask.findOne({"_id":req.params.id }).exec()
    .then(results=>{
        res.status(200).json(results);
    }
        
    )
    .catch(error=>res.status(500).json(error));
};

const getSubtasks=(req,res)=>{
    
     Subtasks.find({}).exec()
    .then(results=>{
        res.status(200).json(results);
    }
        
    )
    .catch(error=>res.status(500).send(error));
};

const deleteSubtask=(req,res)=>{

    

    Subtask.deleteOne({"_id":req.params.id })
    .then(result=>
        res.status(200).json(result)
    ).catch(error=>res.status(500).send(error));

}


module.exports={
    getSubtask,
    getSubtasks,
    postSubtask,
    deleteSubtask
}
    
    