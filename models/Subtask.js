const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubtaskSchema = new Schema({
 name:{
     type:String,
    required:[true, "Subtask field cannot be empty"], 
    maxLength: [200, "Please enter maximum 200 characters for the subtask"], 
     minLength:[2,"Please enter alteast two characters for the subtask"]
   
   
},


 
});
exports.SubtaskSchema=SubtaskSchema;
exports.Subtask=mongoose.model("Subtask", SubtaskSchema);
