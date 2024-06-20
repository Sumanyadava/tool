const shortTodo = require('../models/shortTodo.models')

const shortController = async (req, res) => {
  try {

    const shortTodos = new shortTodo({
      userId: '6672914f2fb48a413980374a',
      
        task:[
          {
            tname:'go to school'
          }
        ]
    }
      );

    
    const savedShortTodo = await shortTodos.save();

    res.status(201).json(savedShortTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  shortController
};