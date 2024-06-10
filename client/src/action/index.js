export const IncAction = (num) => {
  return {
    type: "INCREMENT",
    payload: num,
  };
};

export const DecAction = () => {
  return {
    type: "DECREMENT",
  };
};

export const TodoAdd = () => {
  return {
    type: "ADD_TODO",
    payload: "new todo",
  };
};
export const RemoveTodo = () => {
    return {
      type: "REMOVE_TODO",
      payload: "new todo",
    };
  };