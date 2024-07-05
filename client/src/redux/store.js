import { configureStore } from '@reduxjs/toolkit';
import shortSlice from './slices/shortSlices';
import longSlices from './slices/longSlices';
import longTaskSlices from './slices/longTaskSlices'


const store = configureStore({
  reducer: {
    short: shortSlice,
    long: longSlices,
    longtask:longTaskSlices,
  },
});

export default store;