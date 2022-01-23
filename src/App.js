import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";


import { AuthProvider } from "./contexts/AuthContext";
import Guitars from "./pages/Guitars";
import ShoppingCart from "./pages/ShoppingCart";

export default function App() {
  return (
    
     
        <Router>
          <AuthProvider>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/shopping-cart" component={ShoppingCart} />
              <Route path="/guitars" component={Guitars} />
              <Route path= '/forgot-password' component={ForgotPassword} />
              <Route exact path="/" component={Guitars} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </AuthProvider>
        </Router>
  );
}
