import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import SearchForm from "components/SearchForm";
import AuthForm from "components/AuthForm";

const AppRouter = ({refreshUser,isLoggedIn,userObj }) => { 
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <div>
          
            <Route exact path="/">
              <SearchForm />
            </Route>
          
          </div>
        ) : (
          <Route exact path="/">
            <AuthForm />
          </Route>
        )}
      </Switch>
    </Router>
  );
};
export default AppRouter;