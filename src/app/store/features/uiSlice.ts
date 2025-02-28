import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface uiSlice {
  selectedComponent: string | null;
}

const initialState: uiSlice = {
  selectedComponent: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedComponent: (state, action: PayloadAction<string | null>) => {
      state.selectedComponent = action.payload;
    },
  },
});

export const { setSelectedComponent } = uiSlice.actions;
export default uiSlice.reducer;
