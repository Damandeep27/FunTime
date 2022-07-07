const router=require('express').Router({mergeParams:true});

const{getSubtask,getSubtasks,postSubtask,deleteSubtask}=require('../controllers/subtaskController.js')

router.get('/',getSubtasks);

router.get('/:id',getSubtask);

router.post('/',postSubtask);

router.delete('/:id',deleteSubtask);

module.exports=router;