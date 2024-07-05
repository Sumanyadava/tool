const Long = require("../models/planner.models.js");
const User = require("../models/user.models.js");

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
        return res.status(400).json({ message: "longname already exists" });
      }

      if (!longTodo) {
        longTodo = await Long.create({
          userId,
          longTodos: [{ longname, longtasks: [] }],
        });
        return res
          .status(201)
          .json({ message: "New longTodo created successfully" });
      }

      longTodo.longTodos.push({ longname, longtasks: [] });
      await longTodo.save();

      return res.status(201).json({
        message: "New longTodo created successfully",
        data: longTodo,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error });
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
  plannerData,
  setPlanner,
  updatePlanner,
  createLongTodo,
};
