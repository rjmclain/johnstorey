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
    } catch (e) {
      alert(e);
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = event => {
    signOutUser();
    this.userHasAuthenticated(false);
    this.props.history.push("/");
  };

  handleStartInstance = event => {
    this.props.history.push("/start-instance");
  };

  handleCopyImage = event => {
    this.props.history.push("/copy-image");
  };

  handleCreateImage = event => {
    this.props.history.push("/create-image");
  };

  handleDeploy = event => {
    this.props.history.push("/dashboard");
  };
  render() {
    // Pass these to child containers.
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      deployedTargets: []
    };

    return (
      !this.state.isAuthenticating && (
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
                {this.state.isAuthenticated ? (
                  <NavItem onClick={this.handleCreateImage}>
                    Create Image
                  </NavItem>
                ) : (
                  [<RouteNavItem key={3} href="/create-image" />]
                )}

                {this.state.isAuthenticated ? (
                  <NavItem onClick={this.handleCopyImage}>Copy Image</NavItem>
                ) : (
                  [<RouteNavItem key={4} href="/copy-image" />]
                )}

                {this.state.isAuthenticated ? (
                  <NavItem onClick={this.handleStartInstance}>
                    Start Instance
                  </NavItem>
                ) : (
                  [<RouteNavItem key={5} href="/start-instance" />]
                )}

                {this.state.isAuthenticated ? (
                  <NavItem onClick={this.handleDeploy}>Blue Green</NavItem>
                ) : (
                  [<RouteNavItem key={2} href="/dashboard" />]
                )}

                {this.state.isAuthenticated ? (
                  <NavItem onClick={this.handleLogout}>Logout</NavItem>
                ) : (
                  [
                    <RouteNavItem key={1} href="/">
                      Login
                    </RouteNavItem>
                  ]
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes childProps={childProps} />
        </div>
      )
    );
  }
}

export default withRouter(App);
