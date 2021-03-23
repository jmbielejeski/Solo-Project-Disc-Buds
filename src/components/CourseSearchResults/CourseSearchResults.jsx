import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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

  useEffect(() => {
    dispatch({
      type: 'CLEAR_SEARCH_REDUCER'
    })
  }, [])

  const classes = useStyles();
  // End Material UI

  const history = useHistory();
  const dispatch = useDispatch();

  // fetch course search results from reducer
  const courseSearchResults = useSelector(store => store.discGolfSearchResults);
  console.log('courseSearchResults', courseSearchResults)

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
            return(
              <Grid 
                container 
                className={classes.root} 
                spacing={2}
                alignItems="center"
                direction="column">
              <ListItem key={course.course_id}>
                <Grid item xs={12}>{course.course_name}</Grid> 
                <Grid item xs={12}>number of holes: {course.holes}</Grid>
                <Grid item xs={12}><button onClick={() => startGame(course.course_name, course.course_id, course.holes)}>Play Course</button></Grid>
              </ListItem>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>Course Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid item xs={12}>
                      Address: {course.street}, {course.city}, {course.state_province}, {course.postal_code}
                    </Grid>
                  </AccordionDetails>
                  <AccordionDetails>
                  <Grid item xs={12}>
                      Description: {course.course_description}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            )
          })}
        </List>
      </Grid>
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