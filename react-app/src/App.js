import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignUpForm from './components/auth/SignUpForm';
import { authenticate } from './store/session';


//COMPONENT IMPORTS
import Home from './components/Home';
import Profile from "./components/Profile"


// ---------------------

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => {
      setLoaded(true)
    });
  }, [dispatch]);

if (!loaded) {
  return null;
}

return (
  <Switch>
    <Route path='/' exact={true} >
      <Home />
    </Route>
    <Route path="/users/:userId" >
      <Profile />
    </Route>
  </Switch>
);
}

export default App;
