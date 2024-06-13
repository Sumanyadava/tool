const initalState = 0;

const changeTheNumber = (state = initalState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + (action.payload || 1);
    case "DECREMENT":
      return state - (action.payload || 1 );
    default:
      return state;
  }
};

export default changeTheNumber