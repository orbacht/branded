import React, { useState, useEffect } from 'react'
import Login from './components/Login/Login';
import { Col, Container, Row } from 'react-bootstrap'
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register/Register';
import Memberstable from './components/Memberstable/Memberstable';
import Logout from './components/Logout/Logout';



export default function App() {
  const [token, setToken] = useState();
  const history = useHistory();

  useEffect(() => {
    let data = sessionStorage.getItem('token');
    if (data != null) {
      setToken(data);
    }
  }, [token])


  if (!token) {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login">
              <Container>
                <Login setToken={setToken} />
              </Container>
            </Route>
            <Container>
              <Route path="/register">
                <Register />
              </Route>
            </Container>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <Container>
              <Row>
                <Col md="auto"><h2>Hello {sessionStorage.getItem('first_name')}!</h2></Col>
                <Col></Col>
                <Col md="auto"><Logout setToken={setToken} /></Col>
              </Row>
              <Memberstable />
            </Container>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )

}

