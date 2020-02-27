import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

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
    noLabel: {
      marginTop: theme.spacing(3),
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

const initial = ['waterTemp', 'casingPressure', 'injValveOpen', 'flareTemp', 'oilTemp', 'tubingPressure'];

const getStyles = (metric: string, metrics: string[], theme: Theme) => {
  return {
    fontWeight: metrics.indexOf(metric) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
};

export default () => {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };
  const handleDelete = (event: React.ChangeEvent<{ value: unknown }>)  => {
    console.info('You clicked the delete icon.',event.target);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="leLabel">Metrics</InputLabel>
        <Select
        
          labelId="leLabel"
          //id="demo-mutiple-chip"
          multiple
          value={personName}
          
          labelWidth={labelWidth}
          onChange={handleChange}
          renderValue={selected => (
            <div className={classes.chips}>
              {(selected as string[]).map(value => (
                <Chip key={value} label={value} className={classes.chip} onDelete={handleDelete} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {initial.map(name => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

// import Paper from '@material-ui/core/Paper';
// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import { createSourceEventStream } from 'graphql';

// let initial = ['waterTemp', 'casingPressure', 'injValveOpen', 'flareTemp', 'oilTemp', 'tubingPressure'];

// // const useStyles = makeStyles(theme => ({

// // }));

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//       '& > *': {
//         margin: theme.spacing(1),
//         width: theme.spacing(16),
//         height: theme.spacing(16),
//       },
//     },
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 120,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//     },
//     selectEmpty: {
//       marginTop: theme.spacing(2),
//     },
//   }),
// );
// export default () => {
//   const classes = useStyles();
//   const [selectedMetrics, setMetrics] = useState(initial);
//   const inputLabel = React.useRef<HTMLLabelElement>(null);
//   const [labelWidth, setLabelWidth] = React.useState(0);

//   useEffect(() => {
//     setLabelWidth(inputLabel.current!.offsetWidth);
//   }, []);

//   const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     //setMetr(event.target.value as string);
//     event.preventDefault();
//     console.log(event.target.value)
//   };

//   return (
//     <div>
//       <FormControl variant="outlined" className={classes.formControl}>
//         <InputLabel ref={inputLabel} id="leLabel"> Metrics </InputLabel>
//         <Select
//           labelId="leLabel"
//           //id="demo-simple-select-outlined"
//           //multiple

//           value="{Selec}"
//           onChange={handleChange}
//           labelWidth={labelWidth}
//         >
//           {selectedMetrics.map((val,idx)=><MenuItem key={idx} value={val}>{val}</MenuItem>)}
//         </Select>
//       </FormControl>
//     </div>
//   );
// };
