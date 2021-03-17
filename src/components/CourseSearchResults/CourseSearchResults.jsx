import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';


function CourseSearchResults() {

  const [courseName, setCourseName] = useState('');
  const [holeCount, setHoleCount] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const courseSearchResults = useSelector(store => store.courseSearchReducer);

  const addCourse = (event) => {
    event.preventDefault();
    console.log('adding course', courseName, holeCount, streetAddress, city, state, zipCode)
  }

  return(
    <div>
      <h5>Select a course</h5>
      <ul>
        {courseSearchResults.map(course => {
          return (
            <li key={course.id}>{course.course_name}</li>
          )
        })}
      </ul>
      <h5>Add a course</h5>
      <form onSubmit={addCourse}>
        <input 
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(evt) => setCourseName(evt.target.value)}
        />
        <input 
          type="number"
          placeholder="Hole Count"
          value={holeCount}
          onChange={(evt) => setHoleCount(evt.target.value)}

        />
        <input 
          type="text"
          placeholder="Street Address"
          value={streetAddress}
          onChange={(evt) => setStreetAddress(evt.target.value)}
        />
        <input 
          type="text"
          placeholder="City"
          value={city}
          onChange={(evt) => setCity(evt.target.value)}
        />
        <select
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
        <input 
          type="number"
          placeholder="Zip"
          value={zipCode}
          onChange={(evt) => setZipCode(evt.target.value)}
        />
        <button>Add course</button>
      </form>
      <Link className="navLink" to='/selectFriend'>Continue</Link>
    </div>

  )
}

export default CourseSearchResults;