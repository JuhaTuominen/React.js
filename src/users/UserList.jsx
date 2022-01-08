import React, { useState, useEffect } from 'react'
import '../App.css'
import UserService from '../services/user'
import User from './User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'
import Message from '../Message'


const UserList = () => {

    const [users, setUsers] = useState([]) // taulukollinen user olioita
    const [näytetäänkö, setNäytetäänkö] = useState(false)
    const [search, setSearch] = useState("")
    const [lisäysTila, setLisäystila] = useState(false)
    const [muokkausTila, setMuokkaustila] = useState(false)
    const [muokattavaUser, setMuokattavaUser] = useState({}) // yksi user olio
    const [message, setMessage] = useState("")
    const [isPositive, setIsPositive] = useState(true)
    const [showMessage, setShowMessage] = useState(false)

    ////////////// ADMIN TILATIETO ////////////////////////////
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        UserService
            .setToken(token)

            ////ADMIN TARKISTUS LOCAL STORAGESTA JA ASETUS STATEEN/////////
            const turvaLuokitus = localStorage.getItem('turvaLuokitus')
            if (turvaLuokitus === '1') {
                setAdmin(true)
            }
            else {
                setAdmin(false)
            }
        UserService
            .getAll()
            .then(data => {
                setUsers(data)
            })
    }, [lisäysTila, näytetäänkö, muokkausTila])

    //Hakukentän onChange tapahtumankäsittelijä
    const handleSearchInputChange = (event) => {
        setNäytetäänkö(true)
        setSearch(event.target.value.toLowerCase())
    }

    const handleDeleteClick = id => {

        //Kaivetaan esiin koko user olio jotta alertissa voidaan näyttää companyName id:n sijaan
        const user = users.find(user => user.userId === id)

        // Poiston varmistus kyselyikkuna
        const confirm = window.confirm(`Haluatko todella poistaa: ${user.käyttäjäNimi}:n pysyvästi?`)

        if (confirm) {

            UserService.remove(id)
                .then(response => {

                    if (response.status === 200) {
                        // Poistetaan user statesta
                        setUsers(users.filter(filtered => filtered.userId !== id))

                        setMessage(`${user.käyttäjäNimi}:n poisto onnistui!`)
                        setIsPositive(true)
                        setShowMessage(true)
                        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

                        setTimeout(() => {
                            setShowMessage(false)
                        }, 4000
                        )
                    }

                })

                .catch(error => {
                    console.log(error)
                    setMessage(`Tapahtui virhe: ${error}. `)
                    setIsPositive(false)
                    setShowMessage(true)
                    setNäytetäänkö(false)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 7000
                    )
                })
        }
        else { // JOS KÄYTTÄJÄ EI VAHVISTANUT POISTOA:
            setMessage('Poisto peruutettu')
            setIsPositive(true)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            }, 4000
            )
        }
    }

    // EDIT buttonin tapahtumakäsittelijä saa parametrin user componentista
    const handleEditClick = user => {

        setMuokattavaUser(user)
        setMuokkaustila(true)
    }

        //________________________________________________________________

    // RETURN ON AINA SE OSA JOKA RENDERÖIDÄÄN RUUDULLE
    // Tässä on käytetty osittain vähän erilaisia ehtolauserakenteita kuin Customereissa

    //////Jos ei ole adminkäyttäjä tulee aina tämä näkymä////////////
    if (admin === false) {
        return (<h2>Tämä sivu on vain pääkäyttäjille</h2>)
    }

    return (
        <>
            <h1><nobr style={{ cursor: 'pointer' }}
                onClick={() => setNäytetäänkö(!näytetäänkö)}>Käyttäjät</nobr>
                <button className="nappi" onClick={() => setLisäystila(true)}>Lisää uusi</button>
            </h1>

            {!lisäysTila && !muokkausTila &&
                <input placeholder="Search by first name" value={search} onChange={handleSearchInputChange} />
            }

            { showMessage &&
                <Message message={message} isPositive={isPositive}/>
            }

            {
                users && admin && näytetäänkö && !lisäysTila && !muokkausTila && users.map(user => { 
                    const lowerCaseName = user.käyttäjäNimi.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return (
                            <User key={user.userId} user={user}
                                handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} />
                        )
                    }
                }
                )
            }

            { !users && <p>Loading...</p>}

            {lisäysTila &&  admin && <UserAdd setLisäystila={setLisäystila} users={users} 
            setUsers={setUsers} setMessage={setMessage} setShowMessage={setShowMessage}
                setIsPositive={setIsPositive} />}

            {muokkausTila && admin && <UserEdit setMuokkaustila={setMuokkaustila} 
            muokattavaUser={muokattavaUser} users={users} 
            setUsers={setUsers} setMessage={setMessage} setShowMessage={setShowMessage}
                setIsPositive={setIsPositive} />}

        </>
    )
}

export default UserList