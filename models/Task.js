const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {SubtaskSchema}=require('./Subtask.js');
const TaskSchema = new Schema({
      name:{type:String, required:[true,"Task name is required"], maxLength: [30,"Please enter maximum 30 characters for the task name"], minLength:[2,'Please enter alteast two characters for the task name']
   
},
 description:{type:String, required:[true,"Description is required"], minLength:[20,"Please enter alteast 20 characters for the description"], maxLength:[256,"Please enter maximum 256 characters for the task name"]
   
},
 priority:{ type:String, required:[true,"Please choose type of priority"], enum:["high","medium","low"],

},
 subtasks:{
    type:[{type:SubtaskSchema}]
 }
});
const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;