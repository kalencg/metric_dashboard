import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { actions } from './reducer';
import { IState } from '../../store';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query($metricName: String!) {
  heartBeat
  getLastKnownMeasurement(metricName: $metricName){
    metric
    at
    value
    unit
  }
}
`;

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

interface Props {
  value: string;
  
}

const getLast = (state: IState) => {
  const { lastData } = state.metrics;
  return {
    lastData,
  };
};

const Wrapper: React.FunctionComponent<Props> = props => {
  return (
    <Provider value={client}>
      <Metric value={props.value} />
    </Provider>
  );
};

const Metric: React.FunctionComponent<Props> = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { lastData } = useSelector(getLast);

  let [result] = useQuery({
    query,
    variables: {
      metricName: props.value,
    },
    requestPolicy: 'cache-and-network',
    pollInterval: 1000,
  });

  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getLastKnownMeasurement } = data;
    dispatch(actions.metricDataRecevied(getLastKnownMeasurement));
  }, [dispatch, data, error]);

  if (fetching || !lastData[props.value]) return <LinearProgress />;
  const { value = '', unit = '' } = lastData[props.value];
  return <Paper className={classes.paper}>
    <h1>{props.value}</h1>
  <h2>{`${value} ${unit}`}</h2>
  
    </Paper>;
};

export default Wrapper;
