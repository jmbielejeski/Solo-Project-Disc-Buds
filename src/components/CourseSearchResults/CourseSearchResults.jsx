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
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';

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
    card: {
      alignItems: "center",
    }
  }));

  const classes = useStyles();
  // End Material UI

  const timer = React.useRef();

  const [loading, setLoading] = useState(false);

// on load clear the search results reducer
useEffect(() => {
  dispatch({
    type: 'CLEAR_SEARCH_REDUCER'
  })
  // have a spinner appear so the results from the API have time to be fetched
  if (!loading) {
    setLoading(true);
    timer.current = window.setTimeout(() => {
      setLoading(false);
    }, 750);
  }
}, [])

  const history = useHistory();
  const dispatch = useDispatch();

  // fetch course search results from reducer
  const courseSearchResults = useSelector(store => store.discGolfSearchResults);

  // handle starting game once a course has been selected
  const startGame = (courseName, courseId, holeCount) => {
    // send selected course info so it can be pulled in on next page
    dispatch({
      // Goes to selectCourseReducer
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
    // have spinner load so results have time to be fetched
    loading ? 
      <Grid
        container 
        className={classes.root} 
        spacing={2}
        alignItems="center"
        justify="space-between"
        direction="column"     
      >  
        <CircularProgress/> 
      </Grid>
    :
        // check if we have search results
        courseSearchResults[0] === undefined ?
    <Grid
      container 
      className={classes.root} 
      spacing={2}
      justify="space-between"
      alignItems="center"
      direction="column"     
    >      
      <Grid item xs={12}>
        <Typography variant="h5">No results found</Typography>
      </Grid>
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        onClick={() => {history.push('/courseSearch')}}
      >
        Back
      </Button>
    </Grid>
  :
    <Grid
      container 
      className={classes.root} 
      spacing={2}
      alignItems="center"
      direction="column"     
    >
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
                  <Grid item xs={12}>
                    <Typography variant="h6">
                    <Link target="_blank" href={`https://www.pdga.com/node/${course.course_node_nid}`}>
                      {course.course_name}
                    </Link>
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
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
                  </Grid>
                  <Box m={1}/>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"  
                        onClick={() => startGame(course.course_name, course.course_id, course.holes)}
                      >
                        Play Course
                      </Button>
                      <Box m={3}/>
                </Grid>
            )
          })}     
      </List>
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