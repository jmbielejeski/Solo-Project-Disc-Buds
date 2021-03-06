import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// Material UI imports
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
// import {amber, lightGreen } from '@material-ui/core/colors';

import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import InfoPage from '../InfoPage/InfoPage';
// import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import HomePage from '../HomePage/HomePage';
import CourseSearch from '../CourseSearch/CourseSearch';
import CourseSearchResults from '../CourseSearchResults/CourseSearchResults';
import SelectFriend from '../SelectFriend/SelectFriend';
import GameProgress from '../GameProgress/GameProgress';
import GameResult from '../GameResult/GameResult';
import FriendsList from '../FriendsList/FriendsList';
import FriendsSearchResults from '../FriendsSearchResults/FriendsSearchResults';
import EditProfile from '../EditProfile/EditProfile';
import FriendDetail from '../FriendDetail/FriendDetail';  
import SoloGame from '../SoloGame/SoloGame';
import Header from '../Header/Header';

import './App.css';

// create custom material UI theme
const customTheme = createMuiTheme({
  // theme settings
  palette: {
    primary: {
      main: '#364e6b',
      light: '#E1E2E1',
      dark: '#072640',
      contrastText: '#fff',
    },
    secondary: {
      main: '#3fc2c9',
      light: '#7bf5fc',
      dark: '#009198',
      contrastText: '#000',
    },
    // error: {
    //   main:'#f50057',
    //   light: '',
    //   dark: '',
    // }, 
    // warning: '',
    // info: '',
    // success: '',
  }
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <div>
          <Nav />
          <Header />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/user will show the UserPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
              Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            
            <ProtectedRoute
              // logged in shoes HomePage
              exact
              path="/homePage"
            >
              <HomePage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shoes HomePage
              exact
              path="/courseSearch"
            >
              <CourseSearch />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shoes HomePage
              exact
              path="/courseSearchResults"
            >
              <CourseSearchResults />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows HomePage
              exact
              path="/selectFriend"
            >
              <SelectFriend />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shoes HomePage
              exact
              path="/gameProgress"
            >
              <GameProgress />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shoes HomePage
              exact
              path="/gameResult"
            >
              <GameResult />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shoes HomePage
              exact
              path="/friendsList"
            >
              <FriendsList />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shoes HomePage
              exact
              path="/friendsSearchResults"
            >
              <FriendsSearchResults />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shoes HomePage
              exact
              path="/friendDetail"
            >
              <FriendDetail />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shoes HomePage
              exact
              path="/soloGame"
            >
              <SoloGame />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shoes HomePage
              exact
              path="/editProfile"
            >
              <EditProfile />
            </ProtectedRoute>


            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute>

            {/* When a value is supplied for the authRedirect prop the user will
              be redirected to the path supplied when logged in, otherwise they will
              be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              authRedirect="/HomePage"
            >
              <LoginPage />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              authRedirect="/HomePage"
            >
              <RegisterPage />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              authRedirect="/homePage"
            >
              <LoginPage />
            </ProtectedRoute>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
