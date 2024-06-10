const initalState = ["addreducer"];

const todoChanger = (state = initalState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];

    case "REMOVE_TODO":
      return state.filter((item, index) => index !== action.payload);

    default:
      return state;
  }
};

export default todoChanger

