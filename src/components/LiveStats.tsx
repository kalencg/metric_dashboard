import React from 'react';
import Metric from '../Features/Metrics/Metric';
import { useSelector } from 'react-redux';
import { IState } from '../store';

const getSelectedMetrics = (state: IState) => {
  const { selectedMetrics } = state.metrics;
  return {
    selectedMetrics,
  };
};

export default () => {
  const { selectedMetrics } = useSelector(getSelectedMetrics);
  return (
    <div>
      {selectedMetrics.map(val => (
        <Metric key={val} value={val} />
      ))}
    </div>
  );
};
