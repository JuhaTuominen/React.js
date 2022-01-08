import React, { useState } from 'react'
import './App.css'
import AuthService from './services/auth'
// import md5 from 'md5'
import Navbar from 'react-bootstrap/Navbar'


const LoginForm = ({ currentUser, setCurrentUser, setMessage,
    setIsPositive, setShowMessage }) => {

    // Login lomakkeen kenttiä vastaavat statet
    const [käyttäjäNimi, setkäyttäjäNimi] = useState('')
    const [salasana, setSalasana] = useState('')

    // Login napin painallus ajaa tämän:
    const authenticate = (event) => {
        event.preventDefault()

        const userForAuth = {
            käyttäjäNimi: käyttäjäNimi,
            salasana: salasana // //vaihda kommentit ao. kanssa jos kannassa hashatty salasana
            //salasana: salasana
        }

        AuthService // Käytetään AuthServicen metodia authenticate()
            .authenticate(userForAuth)
            .then(response => {

                //Palvelimen vastauksena tullut käyttäjä talletetaan selaimen local storageen
                //Päätetään tallettaa vain 2 tietoa:
                localStorage.setItem('user', response.käyttäjäNimi)
                localStorage.setItem('token', response.token)

                //////// Admin check //////////////////////////////////////////////
                localStorage.setItem('turvaLuokitus', response.turvaLuokitus)
                ///////////////////////////////////////////////////////////////////

                // Asetetaan käyttäjänimi currentUser -stateen, jota säilytetään App.js:ssä
                setCurrentUser(response.käyttäjäNimi)

                // Annetaan ilmoitus käyttäen Message komponenttia, joka sijaitsee nyt tämän
                // viestin näyttämiseksi App.js komponentissa navbarin alapuolella.
                // Login form on niin pieni ja nurkassa että tämän sisällä ei voi näyttää messagea.

                setMessage(`Tervetuloa ${response.käyttäjäNimi}`)
                setIsPositive(true)
                setShowMessage(true)

                // Message pois pienen viiveen jälkeen:
                setTimeout(() => {
                    setShowMessage(false)
                }, 1000

                )

            })

            .catch(error => {
                setMessage(`Error ${error}`)
                setIsPositive(false)  // Erroreille punainen viesti
                setShowMessage(true)

                // Message pois pienen viiveen jälkeen:
                setTimeout(() => {
                    setShowMessage(false)
                }, 4000

                )
            })
    }

    // Tämä funktio ajetaan kun tehdään Logout
    const logout = () => {
        localStorage.clear()
        setCurrentUser(null)

        // Message
        setMessage('Kirjauduit ulos onnistuneesti')
        setIsPositive(true)
        setShowMessage(true)

        // Message pois pienen viiveen jälkeen:
        setTimeout(() => {
            setShowMessage(false)
        }, 1000

        )

    }

    // Empty napin painallus ajaa tämän
    const emptyFields = () => {
        setSalasana('')
        setkäyttäjäNimi('')
    }

    // Jos App.js:n useEffect funktio ei löydä local storagesta käyttäjää, tilanne on tämä:
    if (!currentUser) {
        return (
            <>
                <form className="login-form" onSubmit={authenticate}>
                    <input className="login-input" value={käyttäjäNimi} type="text" placeholder="Käyttäjän nimi" onChange={({ target }) => setkäyttäjäNimi(target.value)} />

                    <input className="login-input" value={salasana} type="password" placeholder="salasana" onChange={({ target }) => setSalasana(target.value)} />

                    <button type="submit" className="login-button">Login</button>

                    <p className="cancel-button" onClick={emptyFields}>Empty</p>
                </form>
            </>
        )
    }
    // Muussa tapauksessa:
    else if (currentUser) {
        return (
            
            <Navbar className="käyttäjä-tieto">
                <nobr>{`Logged in as ${currentUser}`}</nobr>
                <button className="cancel-button" onClick={logout}>Logout</button>
            </Navbar>
        )
    }

}

export default LoginForm