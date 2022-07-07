const router=require('express').Router({mergeParams:true});
const subtaskRouter=require('./subtasks.js');
const taskRouter=require('./tasks.js');

router.use('/subtasks',subtaskRouter);
router.use('/tasks',taskRouter);

module.exports=router;

