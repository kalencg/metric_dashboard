import React from 'react';
import Grid from '@material-ui/core/Grid';

import MetricPicker from './MetricPicker';
import LiveStat from './LiveStat';
import Plotter from './Plotter';

export default () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <LiveStat />
      </Grid>
      <Grid item xs={6}>
        <MetricPicker />
      </Grid>
      <Grid item xs={12}>
        <Plotter />
      </Grid>
    </Grid>
  );
};
