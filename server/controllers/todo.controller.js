
const shortTodo = require("../models/shortTodo.models");

const shortController = async (req, res) => {
  try {
    const { userId, tname } = req.body;

    const shortTodos = await shortTodo.findOne({ userId: userId });

    if (!shortTodos) {
      return res.status(404).json({ error: "shortTodo not found" });
    } else {
      shortTodos.task.push({ tname: tname });
    }

    const savedShortTodo = await shortTodos.save();

    res.status(201).json(savedShortTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  shortController,
};
