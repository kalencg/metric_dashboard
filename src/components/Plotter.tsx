import React from 'react';
import Plot from 'react-plotly.js'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default ()=>{
    const classes = useStyles();
    return <Plot className={classes.paper}
    data={[
      {
        x: [1, 2, 3],
        y: [2, 6, 3],
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'red'},
      }
    ]}
    layout={ {width: 1020, height: 540, title: 'TODO: add data'} }
  />
}





