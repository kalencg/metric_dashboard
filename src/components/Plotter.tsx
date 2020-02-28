import React from 'react';
import { useSelector,shallowEqual } from 'react-redux';
import Plot from 'react-plotly.js';
import { makeStyles } from '@material-ui/core/styles';
import { IState } from '../store';
import { Provider, createClient, useQuery } from 'urql';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});



const getSelectedMetrics = (state: IState) => {
  const { selectedMetrics } = state.metrics;
  return {
    selectedMetrics,
  };
};



const getQuery = (metrics:string[]) => {
  let  query = `
  query {
    getMultipleMeasurements(input: [`;
  

  let before = new Date().getTime();

  let after = before-1800000;

  for (let metric of metrics){
    query+=`{ metricName: "${metric}", before: ${before}, after: ${after} }`
    
  }
  return query+=`]) {
    metric
    measurements {
      at
      value
      unit
    }
  }
}
`;
};
const getPlotData= (raw:any)=>{
  let plotData=[];
  for (let data of raw){
    let x = data.measurements.map((val:any)=>new Date(val.at).toLocaleTimeString())
    let y = data.measurements.map((val:any)=>val.value)
    plotData.push({
      x,
      y,
      name: data.metric,
      type: 'scatter',
      mode: 'lines',
    })
}
  return plotData

}

const Plotter = () => {
  const { selectedMetrics } = useSelector(getSelectedMetrics, shallowEqual);
  const [result] = useQuery({
    query: getQuery(selectedMetrics)
  });
  if (!selectedMetrics.length || !result.data ||!result.data.getMultipleMeasurements.length) return null;
  let plotdata:any= getPlotData (result.data.getMultipleMeasurements) 
  return !selectedMetrics.length ? null : (
    <Plot
      className={'classes.paper'}
      data={plotdata}
      layout={{ width: 1020, height: 540, title: 'Historical Data (30 min)' }}
    />
  );
};

export default () => {
  return (
    <Provider value={client}>
      <Plotter />
    </Provider>
  );
};
