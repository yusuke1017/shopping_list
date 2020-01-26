import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../Theme/ThemeProvider'
import HeaderBar from '../HeaderBar/HeaderBar';
import Material from '../Material/Material'
import Dish from '../Dish/Dish'
import Menu from '../Menu/Menu'
import List from '../List/List'
import Notfound from '../Notfound/Notfound'
import BottomBar from '../BottomBar/BottomBar'
import Container from '@material-ui/core/Container';

class App extends Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Helmet>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
        </Helmet>
        <div className="app">
          <HeaderBar />
          <Router>
            <Container maxWidth="lg" className="container">
              <Switch>
                <Route exact path="/" component={Material} />
                <Route exact path="/dish" component={Dish} />
                <Route exact path="/menu" component={Menu} />
                <Route exact path="/list" component={List} />
                <Route component={Notfound} />
              </Switch>
            </Container>
            <BottomBar />
          </Router>
        </div>
      </ThemeProvider>
    );
  }
}

export default connect()(App);
