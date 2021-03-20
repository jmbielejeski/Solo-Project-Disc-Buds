import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { useState } from 'react';

// Material UI imports
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {Button, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

function AddCourseForm() {
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

      // local state to capture the input for adding a course
      const [courseName, setCourseName] = useState('');
      const [holeCount, setHoleCount] = useState('');
      const [streetAddress, setStreetAddress] = useState('');
      const [city, setCity] = useState('');
      const [state, setState] = useState('');
      const [zipCode, setZipCode] = useState('');
    
      const [googleMapsSearch, setGoogleMapsSearch]= useState('');

  // handle adding ac course by sending the input data to the saga
  const addCourse = (event) => {
    event.preventDefault();
    // console.log('adding course', courseName, holeCount, streetAddress, city, state, zipCode);
    dispatch({
      type: 'ADD_COURSE',
      payload: {
        course_name: courseName,
        hole_count: holeCount,
        address: streetAddress,
        city: city,
        state: state,
        zip_code: zipCode
      }
    })
  }

  const getGoogleMapsSearch = (event) => {
    event.preventDefault();
    console.log('in google maps search', googleMapsSearch)
    dispatch({
      type: 'GOOGLE_MAPS_SEARCH',
      payload: {
        googleMapsSearch
      }
    })
  }

  return (
    <div>
      <h3>Add a course through Google</h3>
      <FormControl component="fieldset">
        <FormLabel component="legend">Search for a course through google</FormLabel> 
          <TextField 
            variant="outlined"
            placeholder="Search for a course on google"
            onChange={(event) => setGoogleMapsSearch(event.target.value)}
            required={true} 
          />  
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            className={classes.button} 
            onClick={getGoogleMapsSearch}
          >
            Search
          </Button>
      </FormControl>

      <h3>Add a course manually</h3>

      <form onSubmit={addCourse}>
        <label htmlFor="courseName">Enter course name</label>
        <input 
          id="courseName"
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(evt) => setCourseName(evt.target.value)}
        />
        <label htmlFor="holeCount">Enter hole count</label>
        <input 
          id="holeCount"
          type="number"
          placeholder="Hole Count"
          value={holeCount}
          onChange={(evt) => setHoleCount(evt.target.value)}

        />
        <label htmlFor="streetAddress">Enter street address</label>
        <input 
          id="streetAddress"
          type="text"
          placeholder="Street Address"
          value={streetAddress}
          onChange={(evt) => setStreetAddress(evt.target.value)}
        />
        <label htmlFor="city">Enter city</label>
        <input 
          id="city"
          type="text"
          placeholder="City"
          value={city}
          onChange={(evt) => setCity(evt.target.value)}
        />
        <label htmlFor="state">Select State</label>
        <select
          id="state"
          value={state}
          onChange={(evt) => setState(evt.target.value)}
        >
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
        <label htmlFor="zipCode">Enter zip code</label>
        <input 
          id="zipCode" 
          type="number" 
          min="00000"
          max="99999"
          value={zipCode}
          onChange={(evt) => setZipCode(evt.target.value)}
        />
        <button>Add course</button>
      </form>
      <Link className="navLink" to='/courseSearchResults'>Back</Link>

    </div>
  )
}

export default AddCourseForm;