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
const [discGolfCourseSearch, setDiscGolfCourseSearch]= useState('');

// send input values to third party API to search for course
const getDiscGolfCourseSearch = (event) => {
  event.preventDefault();
  console.log('in google maps search', discGolfCourseSearch)
  dispatch({
    type: 'PDGA_SEARCH',
    payload: {
      discGolfCourseSearch
    }
  })
  // navigate to courseSearchResults
  history.push('/courseSearchResults');
}
// if nothing is entered disable the button
if (discGolfCourseSearch === '') {
  return (
    <Grid 
      container 
      className={classes.root} 
      spacing={2}
      alignItems="center"
      direction="column"
    >

      <Grid item xs={12}>
        Course Search
      </Grid>
      <FormControl component="fieldset">
        <FormLabel component="legend"></FormLabel> 
          <TextField 
            variant="outlined"
            placeholder="Search for a course on google"
            onChange={(event) => setDiscGolfCourseSearch(event.target.value)}
            required={true} 
          />  
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            className={classes.button} 
            onClick={getDiscGolfCourseSearch}
            disabled
          >
            Search
          </Button>
      </FormControl>

      </Grid>
  )
  // once input is entered enable button
} else {
  return (
    <Grid 
      container 
      className={classes.root} 
      spacing={2}
      alignItems="center"
      direction="column"
    >
      <Grid item xs={12}>
        Course Search
      </Grid>
      <FormControl component="fieldset">
        <FormLabel component="legend"></FormLabel> 
          <TextField 
            variant="outlined"
            placeholder="Search for a course on google"
            onChange={(event) => setDiscGolfCourseSearch(event.target.value)}
            required={true} 
          />  
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            className={classes.button} 
            onClick={getDiscGolfCourseSearch}
          >
            Search
          </Button>
      </FormControl>
    </Grid>
  )
  }
}

export default CourseSearch;