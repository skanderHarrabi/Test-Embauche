import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import HomePage from "./pages/home-page/HomePage";
import Navbar from "./components/navbar/Navbar";
import ProductsPage from "./pages/products-page/ProductsPage";
import CategoryPage from "./pages/category-page/CategoryPage";
import { logout } from "./actions/auth-actions/actions";

const App = props => {
  return (
    <div className={"app"}>
      <Navbar
        user={props.user}
        isLoggedIn={props.isLoggedIn}
        logout={props.logout}
      />
      <Switch location={props.history.location}>
        <Route exact path={"/"} component={HomePage} />
        <Route exact path={"/product"} component={ProductsPage} />
        <Route exact path={"/category"} component={CategoryPage} />
      </Switch>

    </div>
  );
};
function AuthRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      exact
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{ pathname: "/signin", state: { from: props.location } }}
            />
          )
      }
    />
  );
}


function GuestRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      exact
      render={props =>
        !authenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
const mapStateToProps = reduxStore => {
  return {
    isLoggedIn: reduxStore.authReducer.isLoggedIn,
    user: reduxStore.authReducer.user,
    isLoadingUser: reduxStore.authReducer.isLoadingUser
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(App)
);
