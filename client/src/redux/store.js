import { configureStore } from '@reduxjs/toolkit';
import shortSlice from './slices/shortSlices';
import longSlices from './slices/longSlices';
import shortTaskSlices from './slices/shortTaskSlices';


const store = configureStore({
  reducer: {
    short: shortSlice,
    long: longSlices,
    shorttask:shortTaskSlices,
  },
});

export default store;