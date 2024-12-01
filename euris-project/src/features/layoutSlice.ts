import { createSlice } from '@reduxjs/toolkit';

type LayoutState = {
  isGrid: boolean;
};

const initialState: LayoutState = {
  isGrid: true,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleLayout(state) {
      state.isGrid = !state.isGrid;
    },
  },
});

export const { toggleLayout } = layoutSlice.actions;
export default layoutSlice.reducer;
