import { createSlice, PayloadAction } from 'redux-starter-kit';

export type MetricsForData = {
  selectedMetrics: string[];
};

export type ApiErrorAction = {
  error: string[];
};

let init : string[]=[];
const initialState = {
  selectedMetrics: init
};


const slice = createSlice({
  name: 'metric',
  initialState,
  reducers: {
    selectionChanged: (state, action: PayloadAction<MetricsForData>) => {
      const { selectedMetrics } = action.payload;
      state.selectedMetrics = selectedMetrics;
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
