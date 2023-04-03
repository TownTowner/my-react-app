import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import { Grid } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import { Link, Route, Router } from 'react-router-dom';
import { authServiceInstance } from './services';
import { HotelBar, LoginPage, PrivateRoute, ReservationPage } from './components';

import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({
  forceRefresh: true
});


class App extends React.Component<any, { currentUser: string }> {

  constructor(props: any) {
    super(props);
    this.state = { currentUser: null };
  }

  componentDidMount() {
    authServiceInstance.currentUser?.subscribe((x: any) => {
      console.log('didmount auth subscribe', x);
      this.setState({ currentUser: x ? JSON.stringify(x) : '' }, () => this.forceUpdate());
    });
    // setTimeout(() => {
    //   console.log('didmount setTimeout');
    //   // this.setState({ currentUser: 'sss' });
    //   AuthService.prototype.login('', '');
    // }, 2000);
  }

  componentWillUnmount(): void {
    // this.logout();
  }

  // detachUser(callback?: Function) {
  //   var u = AuthService.prototype.currentUserValue;
  //   console.log('detach,', u);
  //   this.setState({ 'currentUser': u ? JSON.stringify(u) : u }, () => callback && callback());
  // }

  logout() {
    authServiceInstance.logout();
    history.push('/login');
  }

  render() {
    const { currentUser } = this.state;
    console.log('render,', currentUser);

    return (
      <Router history={history}>
        <div>
          {currentUser && <HotelBar />
            // <nav className="navbar navbar-expand navbar-dark bg-dark">
            //   <div className="navbar-nav">
            //     <Link to="/" className="nav-item nav-link">Home</Link>
            //     <a onClick={this.logout} className="nav-item nav-link">Logout</a>
            //   </div>
            // </nav>
          }

          <div className="jumbotron">
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <PrivateRoute exact path="/" component={ReservationPage} />
                  <Route path="/login" component={LoginPage} />
                  {/* render={(props) => <LoginPage whenLogin={(callback) => this.detachUser(callback)} {...props} />} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

/*const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
function App() {
  return (
    <div className="App">
      <header className="App-header">
        //<img src={logo} className="App-logo" alt="logo" /> 
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default App;
