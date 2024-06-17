const ActionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  SHORT_ADD_TODO: 'SHORT_ADD_TODO',
  LONG_ADD_TODO:"LONG_ADD_TODO",

  SHORT_ADD_TASK:"SHORT_ADD_TASK",
  SHORT_EDIT_TASK:"SHORT_EDIT_TASK",


  LONG_ADD_TASK:"LONG_ADD_TASK",
  
}

export const IncAction = (num) => {
  return {
    type: ActionTypes.INCREMENT,
    payload: num,
  };
};

export const DecAction = () => {
  return {
    type: ActionTypes.DECREMENT,
  };
};

export const shortTodoAdd = (inputTodo) => {
  return {
    type: ActionTypes.SHORT_ADD_TODO,
    payload: (inputTodo || "default short"),
  };
};

export const longTodoAdd = (input) => {
  return{
    type:ActionTypes.LONG_ADD_TODO,
    payload:(input||"Default")
  }
}

export const shortTaskAdd = (id,task) => {
  return {
    type:ActionTypes.SHORT_ADD_TASK,
    payload:{id,task}
  }
}


export const longTaskAdd = (id,input) => {
  return {
    type:ActionTypes.LONG_ADD_TASK,
    payload:{id,input}
  }
}


export const shorttaskedit = (id,input) => {
  return {
    type:ActionTypes.SHORT_EDIT_TASK,
    payload: {id,input} 
  }
}