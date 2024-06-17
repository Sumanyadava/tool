const initalStateShortTask = {
  [0]: ["task1", "task2"],
  task: "def"
};

export const shortTaskReducer = (state = initalStateShortTask, action) => {
  switch (action.type) {
    case "SHORT_ADD_TASK":
      const { id, task } = action.payload;
      return { ...state, [id]: [...(state[id] || []), task] };
    

    default:
      return state;
  }
};

  const shTask = {
    id: 0,
    task: "default Edit"
  } 
export const editTaskShortReducer = (state = shTask,action) => {
  switch (action.type) {
    case "SHORT_EDIT_TASK":
      return {
        ...state , id:action.payload.id,task : action.payload.input
      };

    default:
      return state;
  }
}
// -----------long task --------

const initalStateLongTask = 
  {
    [0]: [{
      title: "tiads",
      deadline: "2024-06-13",
      tag: "tags",
    }],
  }

export const longTaskReducer = (state = initalStateLongTask, action) => {
  switch (action.type) {
    case "LONG_ADD_TASK":
      const {id,input} = action.payload;
      return {...state,[id]:[...(state[id] || []) , input ]}

    default:
      return state;
  }
};
