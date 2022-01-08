import React, { useState } from 'react'
import '../App.css'
import UserService from '../services/user'

const UserAdd = ({ setLisäystila, setMessage, setShowMessage,
    setIsPositive }) => {

    // State määritykset

    const [newKäyttäjäNimi, setNewKäyttäjäNimi] = useState('')
    const [newSalasana, setNewSalasana] = useState('')
    const [newTurvaLuokitus, setNewTurvaLuokitus] = useState('')

    // Lomakkeen onSubmit tapahtumankäsittelijä

    const submitUser = (event) => {
        event.preventDefault()
        var newUser = {
            
            käyttäjäNimi: newKäyttäjäNimi,
            salasana: newSalasana,
            turvaLuokitus: newTurvaLuokitus
        }

        UserService
            .create(newUser)
            .then(response => {

                if (response.status === 200) {
                    setMessage(`Lisätty ${newUser.käyttäjäNimi}`)
                    setIsPositive(true)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 
                        4000
                    )
                }

            })
            .catch(error => {
                setMessage(`Tapahtui virhe. Tässä lisätietoa: ${error}`)
                setIsPositive(false)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 
                    7000
                )
            })

            setTimeout(() => {
                setLisäystila(false)
            }, 500
            )

    }
    // Komponentti palauttaa käyttöliittymään form elementin
    // Lisätty required 2 ensimmäiseen inputiin

    return (
        <form onSubmit={submitUser}>

            {/* inputien tapahtumankäsittelijöissä on määritelty funktio, jotka saa parametrikseen kyseisen
            input elementin target tiedon. Funktiot kutsuvat set state hookia parametrina target.value */}

            <div>
                <input type="text" value={newKäyttäjäNimi} placeholder="Käyttäjän nimi"
                    onChange={({ target }) => setNewKäyttäjäNimi(target.value)} />
            </div>
            <div>
                <input type="password" value={newSalasana} placeholder="Salasana"
                    onChange={({ target }) => setNewSalasana(target.value)} required />
            </div>
            <div>
                <input type="number" value={newTurvaLuokitus} placeholder="Turvaluokitus"
                    onChange={({ target }) => setNewTurvaLuokitus(target.value)} required />
            </div>
            
            <button type="submit" style={{ background: 'green' }}>Tallenna</button>

            <button onClick={() => setLisäystila(false)} style={{ background: 'red' }}>
                Peruuta</button>
        </form>
    )
}

export default UserAdd