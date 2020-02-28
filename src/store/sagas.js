import { all } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import metricsSaga from '../Features/Weather/saga';

export default function* root() {
  //yield spawn(weatherSaga);
  yield all([weatherSaga(),metricsSaga()]);

}
