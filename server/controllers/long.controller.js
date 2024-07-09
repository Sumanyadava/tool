const Long = require("../models/long.models.js");
const User = require("../models/user.models.js");


const allLongTodo = async (req, res) => {
  try {
    const { userId } = req.query;
    const userExists = await User.findById(userId);

    if (!userExists) {
      return res.status(400).json({ message: "User not found" });
    } else {
      let longTodo = await Long.findOne({ userId });
      if (!longTodo) {
        return res.status(201).json({ message: "No long todos found" });
      }
      return res.status(201).json({ data: longTodo });
    }

  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Server error" });
  }
}


const createLongTodo = async (req, res) => {
  try {
    const { userId, longname } = req.body;

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(400).json({ message: "User not found" });
    } else {
      let longTodo = await Long.findOne({ userId });

       // Check if the longname already exists in the longTodos array
       if (
        longTodo &&
        longTodo.longTodos.some((todo) => todo.longname === longname)
      ) {
        return res.status(400).json({ message: "longname already exists",data:longTodo.longTodos });
      }
      let newTodo;

      if (!longTodo) {
        longTodo = await Long.create({
          userId,
          longTodos: [{ longname, longtasks: [] }],
        });
        newTodo = longTodo.longTodos[0]
        
      }else{
        longTodo.longTodos.push({ longname, longtasks: [] });
        await longTodo.save();
        newTodo = longTodo.longTodos[longTodo.longTodos.length - 1]; 
      }

      

      return res.status(201).json({
        message: "New longTodo created successfully",
        newTodoData: {
          id: newTodo._id,
          longname: newTodo.longname,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error });
  }
};






const editTodo = async (req, res) => {
  try {
    const { userId, todoId, newLongname } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let longTodos = await Long.findOne({ userId });
    if (!longTodos) {
      return res.status(404).json({ message: 'No long todos found for this user' });
    }

    const todoIndex = longTodos.longTodos.findIndex(todo => todo._id.toString() === todoId);
    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Long todo not found' });
    }

    // Update the longname of the todo
    longTodos.longTodos[todoIndex].longname = newLongname;

    await longTodos.save();

    return res.status(200).json({
      message: 'Todo edited successfully',
      todo: {
        id: longTodos.longTodos[todoIndex]._id,
        longname: longTodos.longTodos[todoIndex].longname,
      }
    });
  } catch (error) {
    console.error('Error editing todo:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};




const deleteTodo = async (req, res) => {
  try {
    const { userId, todoId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let longTodos = await Long.findOne({ userId });
    if (!longTodos) {
      return res.status(404).json({ message: 'No long todos found for this user' });
    }

    const todoIndex = longTodos.longTodos.findIndex(todo => todo._id.toString() === todoId);
    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Long todo not found' });
    }

    // Remove the todo from the array
    longTodos.longTodos.splice(todoIndex, 1);

    await longTodos.save();

    return res.status(200).json({
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};














const plannerData = async (req, res) => {
  try {
    const { plannertittle } = req.headers;

    if (!plannertittle) {
      return res.status(400).json({ message: "give planner value found" });
    }
    const plannerVal = await Planner.findOne({ plannertitle: plannertittle });
    if (!plannerVal) {
      return res.status(400).json({ message: "user or planner not found" });
    } else {
      return res.status(200).json({ message: plannerVal });
    }
  } catch (error) {
    console.error("Error handling planner request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const setPlanner = async (req, res) => {
  const { user, plannertitle, deadline, impurg, milestone, plantext } =
    req.body;
  try {
    const newPlanner = Planner({
      user,
      plannertitle,
      deadline,
      impurg,
      milestone,
      plantext,
    });
    await newPlanner.save();
    return res
      .status(200)
      .json({ message: "success full planner", data: newPlanner });
  } catch (error) {
    console.error("Error handling planner request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updatePlanner = async (req, res) => {
  const { user, plannertitle, deadline, impurg, task, plantext } = req.body;

  try {
    const exsistUser = await Planner.findOneAndUpdate(
      {
        plannertitle: plannertitle,
      },
      {
        user,
        plannertitle,
        deadline,
        impurg,
        milestone: [{ task: task }],
        plantext,
      }
    );
    if (exsistUser) {
      return res.status(200).json({ message: "Planner updated successfully" });
    } else {
      return res.status(404).json({ message: "Planner updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "error during edit" });
  }
};

// ---------------------------------------------

const addLongTask = async (req, res) => {
  try {
    
    const {userId, todoId, plannertitle, deadline, impurg, milestone, plantext } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let longTodos = await Long.findOne({ userId });
    if (!longTodos) {
      return res.status(404).json({ message: 'No long todos found for this user' });
    }

    const todoIndex = longTodos.longTodos.findIndex(todo => todo._id.toString() === todoId);
    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Long todo not found' });
    }

    const newTask = {
      plannertitle,
      deadline,
      impurg,
      milestone,
      plantext:"",
    };

    longTodos.longTodos[todoIndex].longtasks.push(newTask);
    await longTodos.save();


    // Find the newly added task
    const addedTask = longTodos.longTodos[todoIndex].longtasks.find(task => task.plannertitle === newTask.plannertitle);

    return res.status(201).json({
      message: 'Task added successfully',
      task: {
        id: addedTask._id,
        plannertitle: addedTask.plannertitle,
        deadline: addedTask.deadline,
        impurg: addedTask.impurg,
        milestone: addedTask.milestone,
        plantext: addedTask.plantext,
      }
    });
    
  } catch (error) {
    console.error('Error adding long task:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const editLongTask = async (req, res) => {
  try {
    
    const {userId, todoId, taskId, plannertitle, deadline, impurg, milestone, plantext } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let longTodos = await Long.findOne({ userId });
    if (!longTodos) {
      return res.status(404).json({ message: 'No long todos found for this user' });
    }

    const todoIndex = longTodos.longTodos.findIndex(todo => todo._id.toString() === todoId);
    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Long todo not found' });
    }

    const taskIndex = longTodos.longTodos[todoIndex].longtasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    longTodos.longTodos[todoIndex].longtasks[taskIndex] = {
      id: taskId,
      plannertitle,
      deadline,
      impurg,
      milestone,
      plantext,
    };
  

    await longTodos.save();

    return res.status(200).json({
      message: 'Task edited successfully',
      task: longTodos.longTodos[todoIndex].longtasks[taskIndex],
    });
  } catch (error) {
    console.error('Error editing long task:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  plannerData,
  setPlanner,
  updatePlanner,
  createLongTodo,
  allLongTodo,
  addLongTask,
  editLongTask,
  editTodo,
  deleteTodo,
};
