import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Material UI imports
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {Button, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';


function CourseSearchResults() {
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

  // fetch course search results from reducer
  const courseSearchResults = useSelector(store => store.courseSearchReducer);

  // handle starting game once a course has been selected
  const startGame = (courseName, courseId, holeCount) => {
   // console.log('courseId', courseName, courseId)
    // send selected course info so it can be pulled in on next page
    dispatch({
      type: 'SET_SELECT_COURSE',
      payload: {
        courseName,
        courseId,
        holeCount
      }
    })
    // navigate to selectFriend
    history.push('/selectFriend');
  }
    
  const goToAddCourseForm = () => {
    history.push('/addCourse');
  }

  return(
    <Grid
      container 
      className={classes.root} 
      spacing={2}
      alignItems="center"
      direction="column"     
    >
      <Grid item xs={12}>Select a Course</Grid>
      <Grid item xs={12}>
        <List>
          {courseSearchResults.map(course => {
            return (
              <ListItem key={course.id}>
                <Grid item xs={12}>{course.course_name}</Grid> 
                <Grid item xs={12}>number of holes: {course.hole_count}</Grid>
                <Grid item xs={12}><button onClick={() => startGame(course.course_name, course.id, course.hole_count)}>Play Course</button></Grid>
              </ListItem>
            )
          })}
        </List>
      </Grid>
      <Grid item xs={12}>Or Add a Course</Grid>
      <Button 
        variant="contained" 
        color="primary"
        onClick={goToAddCourseForm}
      >
        Add a course
      </Button>
      <Link 
        component="button"
        variant="body1"
        onClick={() => {history.push('/courseSearch')}}
      >
        Back
      </Link>
    </Grid>

  )
}

export default CourseSearchResults;