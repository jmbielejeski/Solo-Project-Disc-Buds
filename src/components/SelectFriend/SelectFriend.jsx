import { useDispatch, useSelector } from 'react-redux';

// Material UI imports
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useEffect } from 'react';

function SelectFriend() {

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

  const dispatch = useDispatch();

  const friendList = useSelector(store => store.friendListReducer);

  const selectCourse = useSelector(store => store.selectCourseReducer);


  useEffect(() => {
    dispatch({
      type: 'FETCH_FRIEND_COURSE_HISTORY',
      payload: {
        selectCourse
      }
    })
  }, [])

  console.log('selectCourse is ', selectCourse);


  const handleClick = () => {
    console.log('clicked button');
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
      {selectCourse.courseName} 
    </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
        <FormLabel component="legend">Choose a friend to play against</FormLabel>
          <Grid item xs={12}>
            <RadioGroup aria-label="Friend" name="friend.id" >
              {friendList.map(friend => {
                return (
                  <FormControlLabel 
                    value={friend.username}
                    control={<Radio />} 
                    label={friend.username}
                  />
                )
              })}
            </RadioGroup>
          </Grid>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            className={classes.button} 
            onClick={handleClick}
          >
            Start Game!
          </Button>
        </FormControl>
    </Grid>
  </Grid>
  )
}

export default SelectFriend;