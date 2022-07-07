const router=require('express').Router({mergeParams:true});

const{getTask,getTasks,postTask,updateTask,deleteTask}=require('../controllers/taskController.js')

router.get('/',getTasks);

router.get('/:id',getTask);
router.put('/:id',updateTask);

router.post('/',postTask);
router.delete('/:id',deleteTask);

module.exports=router;