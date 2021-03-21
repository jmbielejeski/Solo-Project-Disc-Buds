import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Material UI imports
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {Button, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
    <div>
      <h5>Select a Course</h5>
      <ul>
        {courseSearchResults.map(course => {
          return (
            <li key={course.id} >{course.course_name} number of holes: {course.hole_count}
              <button onClick={() => startGame(course.course_name, course.id, course.hole_count)}>Play Course</button>
            </li>
          )
        })}
      </ul>
      <h5>Or Add a Course</h5>
      <button onClick={goToAddCourseForm}>Add a course</button>
      <Link className="navLink" to='/courseSearch'>Back</Link>
    </div>

  )
}

export default CourseSearchResults;