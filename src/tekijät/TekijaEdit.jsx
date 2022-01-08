import React, { useState } from 'react'
import '../App.css'
import TekijätServices from '../services/tekijät'

const TekijaEdit = ({ setMuokkaustila, setMessage, setShowMessage,
    setIsPositive, muokattavaTekijä }) => {

    // State määritykset

    const [newTekijä, setTekijä] = useState(muokattavaTekijä.Tekijä)

    // Muokkauslomakkeen onSubmit tapahtumankäsittelijä

    const submitTekijä = (event) => {
        event.preventDefault()
        var changedTekijä = {

            Tekijä: newTekijä
        }
        console.log (muokattavaTekijä)

        TekijätServices
            .update(muokattavaTekijä.tekijäId, changedTekijä) // Put pyyntö back-endille
            .then(response => {

                if (response.status === 200) {

                    setMessage(`Päivitetty ${changedTekijä.Tekijä}`)
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
        <form onSubmit={submitTekijä}>

            {/* inputien tapahtumankäsittelijöissä on määritelty funktio, jotka saa parametrikseen kyseisen
            input elementin target tiedon. Funktiot kutsuvat set state hookia parametrina target.value */}

            <div>
                <input type="text" value={newTekijä} placeholder="Tekijä"
                    onChange={({ target }) => setTekijä(target.value)} required />
            </div>

            <button className="login-button" type="submit" tyle={{ background: 'green' }}>Tallenna</button>

            <button className="cancel-button" onClick={() => setMuokkaustila(false)} style={{ background: 'red' }}>Peru</button>
        </form>
    )
}

export default TekijaEdit