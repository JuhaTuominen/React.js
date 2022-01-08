import React, { useState, useEffect } from 'react'
import './App.css'
import TekijatList from './tekijät/TekijatList'
import TyoajatList from './työajat/TyoajatList'
import TyomaatList from './työmaat/TyomaatList'
import UserList from './users/UserList'
import LoginForm from './LoginForm'
import Homepage from './Homepage'
import Message from './Message'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'


const App = () => {
 
    // State kirjautuneesta käyttäjästä
    const [currentUser, setCurrentUser] = useState()
  
    // Statet Login aiheisesta Messagen näyttämisestä
    const [showMessage, setShowMessage] = useState(false)
    const [isPositive, setIsPositive] = useState(true)
    const [message, setMessage] = useState('')

  
    // use effectissä tarkistetaan onko selaimen local storagessa user tietoa vanhastaan
    useEffect(() => {
      const userFromLS = localStorage.getItem('user')
      if (userFromLS) {
        setCurrentUser(userFromLS)
        
      }
    }, []
    )
  
    if (currentUser) {
      return (
        <div className="App">
          <header className="App-header">
            <h2>Työajanseuranta</h2>
          </header>
  
          <Router>
            <Navbar bg="dark" variant="dark">
              <Nav className="mr-auto">
                <Link to={'/'} className='nav-link'>Home</Link>
                <Link to={'/Tekijät'} className='nav-link'>Tekijät</Link>
                <Link to={'/Työajat'} className='nav-link'>Työajat</Link>
                <Link to={'/Työmaat'} className='nav-link'>Työmaat</Link>
                {localStorage.getItem('turvaLuokitus') === '1' &&<Link to={'/Users'} className='nav-link'>Käyttäjät</Link>} {/* tällä piilotetaan ei admin käyttäjiltä koko user linkki */}
                <LoginForm currentUser={currentUser} setCurrentUser={setCurrentUser} setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage} />
              </Nav>
            </Navbar>
  
            {showMessage &&
              <Message message={message} isPositive={isPositive} />
            }
  
            <Switch>
              <Route path='/Tekijät' component={TekijatList} />
              <Route path='/Users' component={UserList} />
              <Route path='/Työajat' component={TyoajatList} />
              <Route path='/Työmaat' component={TyomaatList} />
              <Route path='/' component={Homepage} />
            </Switch>
  
          </Router>
        </div >
      )
    }
  
    else {
      return (
        <div className="App">
          <header className="App-header">
            <h2>Työajanseuranta</h2>
          </header>
  
          <Router>
            <Navbar bg="dark" variant="dark">
              <LoginForm currentUser={currentUser} setCurrentUser={setCurrentUser}
                setMessage={setMessage} setIsPositive={setIsPositive}
                setShowMessage={setShowMessage} />
            </Navbar>
  
            {showMessage &&
              <Message message={message} isPositive={isPositive} />
            }
  
            <Switch>
              <Route path='/' component={Homepage} />
            </Switch>
          </Router>
        </div >
      )
    }
  }
export default App