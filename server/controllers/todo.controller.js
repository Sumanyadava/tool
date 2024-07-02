const ShortTodo = require("../models/shortTodo.models.js");
const Planner = require("../models/planner.models.js");
const User = require("../models/user.models.js");

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

      if (!shortTodo) {
        shortTodo = await ShortTodo.create({
          userId,
          shortTodos: [{ shortname, tasks: [] }],
        });
        return res
          .status(201)
          .json({ message: "New shortTodo created successfully" });
      }

      shortTodo.shortTodos.push({ shortname, tasks: [] });
      await shortTodo.save();

      return res.status(201).json({
        message: "New shortTodo created successfully",
        data: shortTodo,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error });
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
      shortTodo.tasks.push({ tname: tname });
      await User.save();

      res.status(201).json({ message: "task added" });
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

module.exports = {
  shortTask,
  plannerData,
  setPlanner,
  updatePlanner,
  createShortTodo,
};
