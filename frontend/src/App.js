import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, NavItem, Navbar } from "react-bootstrap";
import Routes from "./Routes";
import RouteNavItem from "./components/RouteNavItem";
import { authUser, signOutUser } from "./libs/awsLib";
import "./App.css";

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthentication: true
    };
  }

  async componentDidMount() {
    try {
      if (await authUser()) {
        this.userHasAuthenticated(true);
      }
    }
    catch(e) {
      alert(e);
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    signOutUser();
    this.userHasAuthenticated(false);
    this.props.history.push("/");
  }

  handleUATToProd = event => {
    this.props.history.push("/UATToProd");
  }

  handleDeploy = event => {
    this.props.history.push("/dashboard");
  }
  render() {
    // Pass these to child containers.
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      deployedTargets: []
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App Container">
      <Navbar fluid collapseOnSelect>
      <Navbar.Header>
      <Navbar.Brand>
      <Link to="/">Insureon</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>

          {this.state.isAuthenticated
            ? <NavItem onClick={this.handleUATToProd}>UATToProd</NavItem>
            : [
              <RouteNavItem key={2} href="/UATToProd">
              </RouteNavItem>
            ]}

          {this.state.isAuthenticated
            ? <NavItem onClick={this.handleDeploy}>Deploy</NavItem>
            : [
              <RouteNavItem key={2} href="/dashboard">
              </RouteNavItem>
            ]}

          {this.state.isAuthenticated
            ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
            : [
              <RouteNavItem key={1} href="/">
                Login
              </RouteNavItem>
            ]}
        </Nav>
      </Navbar.Collapse>
      </Navbar>
      <Routes childProps={childProps} />
      </div>
    );
  }

}

export default withRouter(App);