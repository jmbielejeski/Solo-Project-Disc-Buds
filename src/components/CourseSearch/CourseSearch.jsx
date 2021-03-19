import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Material UI imports
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {Button, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

function CourseSearch() {
// Material UI
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
}));

const classes = useStyles();
// End Material UI

const history = useHistory();
const dispatch = useDispatch();

// set local state to store the input for the course search
const [courseSearch, setCourseSearch] = useState('');

// take the input course search and send to saga
const getSearchResults = (event) => {
  event.preventDefault();
  console.log('searching for a course', courseSearch);
  dispatch({
    type: 'FETCH_COURSE_SEARCH',
    payload: {
      courseSearch,
    }
  })
  // navigate to courseSearchResults
  history.push('/courseSearchResults');
}

  return (
    <Grid 
      container 
      className={classes.root} 
      spacing={2}
      alignItems="center"
      direction="column"
    >
      <Grid item xs={12}>
        Course
      </Grid>
        <FormControl component="fieldset">
        <FormLabel component="legend">Search for a course</FormLabel> 
          <TextField
            required 
            variant="outlined"
            placeholder="Search for a course"
            defaultValue={courseSearch}
            onChange={(event) => setCourseSearch(event.target.value)}
          />  
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            className={classes.button} 
            onClick={getSearchResults}
          >
            Search
          </Button>
        </FormControl>
      </Grid>
  )
}

export default CourseSearch;