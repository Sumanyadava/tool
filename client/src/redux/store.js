import { configureStore } from '@reduxjs/toolkit';
import shortSlice from './slices/shortSlices';
import longSlices from './slices/longSlices';



const store = configureStore({
  reducer: {
    short: shortSlice,
    long: longSlices,
    
  },
});

export default store;