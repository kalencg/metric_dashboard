import { createSlice, PayloadAction } from 'redux-starter-kit';

export type MetricsForData = {
  selectedMetrics: string[];
};
export type HeartBeat = {
  heartBeat: number;
};
export type ApiMetricsData = {
  metric: string;
  at: number;
  value: number;
  unit: string;
  __typename: string;
};

export type ApiErrorAction = {
  error: string;
};
export type LastData = {
  unit?: string;
  value?: number;
};

interface MetricState extends MetricsForData {
  lastData: any;
};

const initialState: MetricState = {
  selectedMetrics: [],
  lastData: {},
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    selectionChanged: (state, action: PayloadAction<MetricsForData>) => {
      const { selectedMetrics } = action.payload;
      state.selectedMetrics = selectedMetrics;
    },
    metricDataRecevied: (state, action: PayloadAction<ApiMetricsData>) => {
      const { metric, value, unit } = action.payload;
      state.lastData[metric] = { value, unit };
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
