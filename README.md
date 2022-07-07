# ToDoList


# Website Link
https://cpsc2600-dsingh014.herokuapp.com/

# How to install and run

1. Download all files on your local storage
2. Install required dependencies by running "npm run dev"
3. Type "localhost:8080" in your web browser to see running app

# Description
This app helps creating Todo list in detail. You could have main task and some subtasks under the main task. nce you complete each subtask, click checkbox. It will be removed from list. When all subtasks are finished, means you have completed all required tasks and you could delete the main task.

# Highlights
1. Choosing number of subtasks and displaying corressponding nuumber of fields

2. Validating that each field contain required data
3. Deleting subtask document and that subtask from the main task document
4. Updating task as subtasks get completed

# How it works
1. Write name of task.
2. Write description which should be atleast characters long.
3. Choose priority.
4. Select number of subtasks between 0 and 5. Depending on selection, the number of fields will be appeared. Fill fields and click add task button.
5. if there will be no error, the task will be displayed under my tasks.

6. There will task name, description and some subtasks having checkboxes. Click on checkbox after you completed subtask. It will delete subtask from list. when there will be no subtask left, you will get delete button to delete the task.



# API endpoints

1. get('api/v1/tasks) returns all tasks
2. get('api/v1/tasks/id) returns the task with id supplied in url
3. get('api/v1/subtasks) returns all subtasks
4. get('api/v1/subtasks/id) returns the subtask with id supplied in url
5. post('api/v1/tasks) post a task
6. post('api/v1/subtasks) post a subtask
7. delete('api/v1/tasks/id) delete the task with the given id
7. delete('api/v1/subtasks/id) delete the subtask with the given id
8. put('api/v1/tasks/id) updates the task with the given id

Expected Post body format: 

1. Task
{
     data:task,
     url:`/api/v1/tasks/${task._id}`
}
2. Subtask
{
     data:subtask,
     url:`/api/v1/subtasks/${task._id}`
}





