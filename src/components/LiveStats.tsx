import React from 'react';
import Metric from '../Features/Metrics/Metric';
import { useSelector } from 'react-redux';
import { IState } from '../store';
import { makeStyles, createStyles, Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
        width: theme.spacing(30),
        height: theme.spacing(16),
      },
    },
  }),
);

const getSelectedMetrics = (state: IState) => {
  const { selectedMetrics } = state.metrics;
  return {
    selectedMetrics,
  };
};

export default () => {
  const classes = useStyles();
  const { selectedMetrics } = useSelector(getSelectedMetrics);
  return (
    <div className={classes.root}>
      {selectedMetrics.map(val => (
        <Metric key={val} value={val} />
      ))}
    </div>
  );
};
