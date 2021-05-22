import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";

const App = () => {
  const isAuthed = localStorage.getItem("isAuthed");

  return isAuthed ? <AuthenticateRoutes /> : <UnAuhenticatedRoutes />;
};

export default App;

const AuthenticateRoutes = () => {
  return (
    <Switch>
      <Route path="/home">
        <HomePage />
      </Route>
      <Redirect to="/home" />
    </Switch>
  );
};

const UnAuhenticatedRoutes = () => (
  <Switch>
    <Route path="/login">
      <LoginPage />
    </Route>
    <Route path="/signup">
      <SignupPage />
    </Route>
    <Redirect to="/login" />
  </Switch>
);
