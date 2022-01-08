import React, { useState } from 'react'
import '../App.css'
import UserServices from '../services/user'

const UserEdit = ({ setMuokkaustila, setMessage, setShowMessage,
    setIsPositive, muokattavaUser }) => {

    // State määritykset

    const [newKäyttäjäNimi, setNewKäyttäjäNimi] = useState(muokattavaUser.käyttäjäNimi)
    const [newSalasana, setNewSalasana] = useState(muokattavaUser.salasana)
    const [newTurvaLuokitus, setNewTurvaLuokitus] = useState(muokattavaUser.turvaLuokitus)

    // Muokkauslomakkeen onSubmit tapahtumankäsittelijä

    const submitUser = (event) => {
        event.preventDefault()
        var changedUser = {

            käyttäjäNimi: newKäyttäjäNimi,
            salasana: newSalasana,
            turvaLuokitus: newTurvaLuokitus
        }

        UserServices
            .update(muokattavaUser.userId, changedUser) // Put pyyntö back-endille
            .then(response => {

                if (response.status === 200) {
                    
                    setMessage(`Päivitetty ${changedUser.käyttäjäNimi}`)
                    setIsPositive(true)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 4000
                    )
                }

            })
            .catch(error => {
                setMessage(`Tapahtui virhe. Tässä lisätietoa: ${error}`)
                setIsPositive(false)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 7000
                )
            })

            setTimeout(() => {
                setMuokkaustila(false)
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
                <input type="Salasana" value={newSalasana} placeholder="Salasana"
                    onChange={({ target }) => setNewSalasana(target.value)} required />
            </div>
            <div>
                <input type="number" value={newTurvaLuokitus} placeholder="Turvaluokitus"
                    onChange={({ target }) => setNewTurvaLuokitus(target.value)} required />
            </div>

            <button type="submit" style={{ background: 'green' }}>Tallenna</button>

            <button onClick={() => setMuokkaustila(false)} style={{ background: 'red' }}>
                Peruuta</button>
        </form>
    )
}

export default UserEdit