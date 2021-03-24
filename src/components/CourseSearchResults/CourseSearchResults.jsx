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
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import course from '../../redux/sagas/course.saga';

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

// on load clear the search results reducer
useEffect(() => {
  dispatch({
    type: 'CLEAR_SEARCH_REDUCER'
  })
}, [])

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

  let courseLink = `https://www.pdga.com/node/${course.course_node_nid}`

  return (
    // check if we have search results
    courseSearchResults[0] === undefined ?
    <Grid
      container 
      className={classes.root} 
      spacing={2}
      alignItems="center"
      direction="column"     
    >
      <Grid item xs={12}>No results found</Grid>
      <Link 
        component="button"
        variant="body1"
        onClick={() => {history.push('/courseSearch')}}
      >
        Back
      </Link>
    </Grid>
  :
    <Grid
      container 
      className={classes.root} 
      spacing={2}
      alignItems="center"
      direction="column"     
    >
      <Typography variant="h5">
        Select a Course
      </Typography>
      <Grid item xs={12}>
        <List>
          {courseSearchResults.map(course => {
            return(
              <Grid 
                container 
                className={classes.root} 
                spacing={2}
                alignItems="center"
                direction="column"
              >
                <Divider />
                <ListItem key={course.course_id}>
                  <Link target="_blank" href={`https://www.pdga.com/node/${course.course_node_nid}`}>
                    <Grid item xs={12}>{course.course_name}</Grid> 
                  </Link>
                  <Grid item xs={12}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary" 
                      className={classes.button} 
                      onClick={() => startGame(course.course_name, course.course_id, course.holes)}
                    >
                      Play Course
                    </Button>
                  </Grid>
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
                        {course.holes} hole course
                      </Grid>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Grid item xs={12}>
                        <Link target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${course.street}%2C${course.city}%2C${course.state_province}%2C${course.postal_code}`}>
                          Address: {course.street}, {course.city}, {course.state_province}, {course.postal_code}
                        </Link>
                      </Grid>
                    </AccordionDetails>
                    <AccordionDetails>
                    <Grid item xs={12}>
                        Description: {course.course_description}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Divider />
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