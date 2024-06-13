const initalStateShort = ["Short Todo"];

export const shortTodoReducer = (state = initalStateShort, action) => {
  switch (action.type) {
    case "SHORT_ADD_TODO":
      return [...state, action.payload];

    case "REMOVE_TODO":
      return state.filter((item, index) => index !== action.payload);

    default:
      return state;
  }
};



// ---long todo -----------

const initalStateLong = ['Long Todo']

export const longTodoReducer = (state = initalStateLong,action) => {
  switch (action.type) {
    case "LONG_ADD_TODO":
      return [...state,action.payload]
  
    default:
      return state;
  }
}

