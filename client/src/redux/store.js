import { configureStore } from '@reduxjs/toolkit';
import shortSlice from './slices/shortSlices';
import longSlices from './slices/longSlices';
import shortTaskSlices from './slices/shortTaskSlices';
import longTaskSlices from './slices/longTaskSlices'


const store = configureStore({
  reducer: {
    short: shortSlice,
    long: longSlices,
    shorttask:shortTaskSlices,
    longtask:longTaskSlices,
  },
});

export default store;