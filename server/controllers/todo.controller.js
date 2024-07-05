const ShortTodo = require("../models/shortTodo.models.js");
const User = require("../models/user.models.js");



// get all todo

const allTodo = async(req,res) => {
  try {
    const {userId} = req.query;
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(400).json({ message: "User not found" });
    } else {
      let shortTodo = await ShortTodo.findOne({ userId });
      if (!shortTodo) {
        return res.status(201).json({ message:"no short found" });
      }
      return res.status(201).json({ data:shortTodo });
    }

  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "server error" });
  }
}

// Delete a specific todo for a given user
const deleteTodo = async (req, res) => {
  try {
    const { userId, todoId } = req.query;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let shortTodo = await ShortTodo.findOne({ userId });
    if (!shortTodo) {
      return res.status(201).json({ message:"no short found" });
    }
    
    const todoIndex = shortTodo.shortTodos.findIndex(todo => todo._id.toString() === todoId);
    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    }


    shortTodo.shortTodos.splice(todoIndex, 1);

    await shortTodo.save();

    return res.status(200).json({ message: 'Todo deleted successfully',todoIndex });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Edit a specific todo for a given user
const editTodo = async (req, res) => {
  try {
    const { userId, todoId } = req.query;
    const { shortname } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the ShortTodo document for the user
    let shortTodo = await ShortTodo.findOne({ userId });
    if (!shortTodo) {
      return res.status(404).json({ message: 'No shortTodo found for this user' });
    }

    // Find the todo item to be edited
    const todoIndex = shortTodo.shortTodos.findIndex(todo => todo._id.toString() === todoId);
    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Update the todo's shortname
    shortTodo.shortTodos[todoIndex].shortname = shortname;

    // Save the updated ShortTodo document
    await shortTodo.save();

    return res.status(200).json({ message: 'Todo edited successfully', todo: shortTodo.shortTodos[todoIndex] });
  } catch (error) {
    console.error('Error editing todo:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


//create new short todo and check if already exsist
const createShortTodo = async (req, res) => {
  try {
    const { userId, shortname } = req.body;

    const userExists = await User.findById(userId);

    if (!userExists) {
      return res.status(400).json({ message: "User not found" });
    } else {
      let shortTodo = await ShortTodo.findOne({ userId });

      // Check if the shortname already exists in the shortTodos array
      if (
        shortTodo &&
        shortTodo.shortTodos.some((todo) => todo.shortname === shortname)
      ) {
        return res.status(400).json({ message: "Shortname already exists" });
      }
      let newTodo;
      if (!shortTodo) {
        shortTodo = await ShortTodo.create({
          userId,
          shortTodos: [{ shortname, tasks: [] }],
        });
        newTodo = shortTodo.shortTodos[0];
      }

      shortTodo.shortTodos.push({ shortname, tasks: [] });
      await shortTodo.save();
      newTodo = shortTodo.shortTodos[shortTodo.shortTodos.length - 1]; // last added todo

      return res.status(201).json({
        message: "New shortTodo created successfully",
        newTodoData: {
          id: newTodo._id,
          shortname: newTodo.shortname,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error });
  }
};










// -----------------------------------------------------------

const getTasks = async (req, res) => {
  try {
    const { userId, todoId } = req.query;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const todo = user.todos.id(todoId); // Assuming todos are embedded in the user document
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    return res.status(200).json({ tasks: todo.tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

//creating task
const shortTask = async (req, res) => {
  try {
    const { userId, shortname, tname } = req.body;
    const User = await ShortTodo.findOne({ userId: userId });

    //finding the shorttodo document
    if (!User) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the shortTodo object
    const shortTodo = User.shortTodos.find(
      (todo) => todo.shortname === shortname
    );
    if (!shortTodo) {
      return res.status(404).json({ error: "Shortname not found" });
    }

    // Check if the task already exists
    const existingTask = shortTodo.tasks.find((task) => task.tname === tname);
    if (!existingTask) {
      // Add the new task
      const newTask = {tname:tname}
      shortTodo.tasks.push(newTask);
      await User.save();

      //find the newly added task
      const addedTask = shortTodo.tasks.find((task) => task.tname === tname);
      res.status(201).json({ message: "task added",task:{
        id:addedTask._id,
        tname:addedTask.tname
      } });
    }else{
      return res
      .status(400)
      .json({ message: "Task already exists here", existingTask });
    }

    
  } catch (error) {
    console.error("Error handling short controller request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a specific task for a specific todoId and userId
const deleteTask = async (req, res) => {
  try {
    const { userId, todoId, taskId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const todo = user.todos.id(todoId); // Assuming todos are embedded in the user document
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const taskIndex = todo.tasks.findIndex(task => task._id.toString() === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    todo.tasks.splice(taskIndex, 1);
    await user.save();

    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Edit a specific task for a given user and todo
const editTask = async (req, res) => {
  try {
    const { userId, todoId, taskId ,taskText } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the ShortTodo document for the user
    let shortTodo = await ShortTodo.findOne({ userId });
    if (!shortTodo) {
      return res.status(404).json({ message: 'No shortTodo found for this user' });
    }

    // Find the todo item
    const todoIndex = shortTodo.shortTodos.findIndex(todo => todo._id.toString() === todoId);
    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Find the task item
    const taskIndex = shortTodo.shortTodos[todoIndex].tasks.findIndex(task => task._id.toString() === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the task's text
    shortTodo.shortTodos[todoIndex].tasks[taskIndex].tname = taskText;

    // Save the updated ShortTodo document
    await shortTodo.save();

    return res.status(200).json({ message: 'Task edited successfully', task: shortTodo.shortTodos[todoIndex].tasks[taskIndex] });
  } catch (error) {
    console.error('Error editing task:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  allTodo,
  createShortTodo,
  editTodo,
  deleteTodo,
  
  getTasks,
  shortTask, 
  editTask,
  deleteTask,
};
