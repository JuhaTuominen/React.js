import React, { useState } from 'react'
import '../App.css'
import TekijätService from '../services/tekijät'

const TekijatAdd = ({ setLisäystila, setTekijät, tekijät, setMessage, setShowMessage,
    setIsPositive }) => {

    // State määritykset

    const [newTekijä, setNewTekijä] = useState('')


    // Lomakkeen onSubmit tapahtumankäsittelijä

    const submitTekijä = (event) => {
        event.preventDefault()
        var newTekijät = {
            Tekijä: newTekijä
        }

        TekijätService
            .create(newTekijät)
            .then(response => {

                if (response.status === 200) {
                    setTekijät(tekijät.concat(newTekijät))
                    setMessage(`Lisätty ${newTekijät.Tekijä}`)
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
                    1000
                )
            })

            setTimeout(() => {
                setLisäystila(false)
            }, 1000
            )

    }
    // Komponentti palauttaa käyttöliittymään form elementin
    // Lisätty required 2 ensimmäiseen inputiin

    return (
        <form onSubmit={submitTekijä}>

            {/* inputien tapahtumankäsittelijöissä on määritelty funktio, jotka saa parametrikseen kyseisen
            input elementin target tiedon. Funktiot kutsuvat set state hookia parametrina target.value */}
            <div>
                <input type="text" value={newTekijä} placeholder="Tekijän nimi"
                    onChange={({ target }) => setNewTekijä(target.value)} required />
            </div>

            <button className="login-button" type="submit" style={{ background: 'green' }}>Tallenna</button>

            <button className="cancel-button" onClick={() => setLisäystila(false)} style={{ background: 'red' }}>
            Peru</button>
        </form>
    )
}

export default TekijatAdd