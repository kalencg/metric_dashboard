import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { IState } from '../store';
import { actions } from '../Features/Metrics/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
  }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const availableMetrics = ['waterTemp', 'casingPressure', 'injValveOpen', 'flareTemp', 'oilTemp', 'tubingPressure'];

const getSelectedMetrics = (state: IState) => {
  const { selectedMetrics } = state.metrics;
  return {
    selectedMetrics,
  };
};

export default () => {
  const classes = useStyles();
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const { selectedMetrics } = useSelector(getSelectedMetrics, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    dispatch(actions.selectionChanged({ selectedMetrics: [...selectedMetrics, event.target.value[1]] }));
  };

  const handleDelete = (metricToRemove: string) => () => {
    dispatch(actions.selectionChanged({ selectedMetrics: [...selectedMetrics.filter(val => val !== metricToRemove)] }));
  };
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="leLabel">
          Metrics
        </InputLabel>
        <Select
          labelId="leLabel"
          multiple
          value={['']}
          labelWidth={labelWidth}
          onChange={handleChange}
          renderValue={() => (
            <div className={classes.chips}>
              {selectedMetrics.map(value => (
                <Chip key={value} label={value} className={classes.chip} onDelete={handleDelete(value)} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {availableMetrics
            .filter(val => !selectedMetrics.includes(val))
            .map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};
