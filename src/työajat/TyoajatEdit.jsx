import React, { useState } from 'react'
import '../App.css'
import TyöajatServices from '../services/työajat'

const TyoajatEdit = ({ setMuokkaustila, setMessage, setShowMessage,
    setIsPositive, muokattavaTyöajat }) => {

    // State määritykset

        const [newTekijäId, setTekijäId] = useState(muokattavaTyöajat.newTekijäId)
        const [newAlkamisAika, setAlkamisAika] = useState(muokattavaTyöajat.AlkamisAika)
        const [newPäättymisAika, setPäättymisAika] = useState(muokattavaTyöajat.PäättymisAika)
        const [newTyöId, setTyöId] = useState(muokattavaTyöajat.työId)
    // Muokkauslomakkeen onSubmit tapahtumankäsittelijä

    const submitTyöajat = (event) => {
        event.preventDefault()
        var changedTyöajat = {

            TekijäId: newTekijäId,
            AlkamisAika: newAlkamisAika,
            PäättymisAika: newPäättymisAika,
            työId: newTyöId

        }
        console.log (muokattavaTyöajat)

        TyöajatServices
            .update(muokattavaTyöajat.työId, changedTyöajat) // Put pyyntö back-endille
            .then(response => {

                if (response.status === 200) {

                    setMessage(`Päivitetty työtunnus ${changedTyöajat.työId}`)
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
        <form onSubmit={submitTyöajat}>

            {/* inputien tapahtumankäsittelijöissä on määritelty funktio, jotka saa parametrikseen kyseisen
            input elementin target tiedon. Funktiot kutsuvat set state hookia parametrina target.value */}

            <div>
                <input type="text" value={newTekijäId} placeholder="Tekijän Tunnus"
                    onChange={({ target }) => setTekijäId(target.value)} required />
            </div>
            <div>
                <input type="date" value={newAlkamisAika} placeholder="Työn alkamisaika"
                    onChange={({ target }) => setAlkamisAika(target.value)} required />
            </div>
            <div>
                <input type="date" value={newPäättymisAika} placeholder="Työn päättymisaika"
                    onChange={({ target }) => setPäättymisAika(target.value)} required />
            </div>

            <button className="login-button" type="submit" style={{ background: 'green' }}>Tallenna</button>

            <button className="cancel-button" onClick={() => setMuokkaustila(false)} style={{ background: 'red' }}>
            Peruta</button>
        </form>
    )
    
}

export default TyoajatEdit