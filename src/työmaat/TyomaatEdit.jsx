import React, { useState } from 'react'
import '../App.css'
import TyömaatServices from '../services/työmaat'

const TyomaatEdit = ({ setMuokkaustila, setMessage, setShowMessage,
    setIsPositive, muokattavaTyömaat }) => {

    // State määritykset

        const [newTyökohde, setTyökohde] = useState(muokattavaTyömaat.Työkohde)
        const [newTyötehtävä, setTyötehtävä] = useState(muokattavaTyömaat.Työtehtävä)

    // Muokkauslomakkeen onSubmit tapahtumankäsittelijä

    const submitTyömaat = (event) => {
        event.preventDefault()
        var changedTyömaat = {
            Työkohde: newTyökohde,
            Työtehtävä: newTyötehtävä
        }
        console.log (muokattavaTyömaat)

        TyömaatServices
            .update(muokattavaTyömaat.työmaaId, changedTyömaat) // Put pyyntö back-endille
            .then(response => {

                if (response.status === 200) {

                    setMessage(`Päivitetty ${changedTyömaat.Työkohde}`)
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
        <form onSubmit={submitTyömaat}>

            {/* inputien tapahtumankäsittelijöissä on määritelty funktio, jotka saa parametrikseen kyseisen
            input elementin target tiedon. Funktiot kutsuvat set state hookia parametrina target.value */}

            <div>
                <input type="text" value={newTyökohde} placeholder="Työkohde"
                    onChange={({ target }) => setTyökohde(target.value)} required />
            </div>
            <div>
                <input type="text" value={newTyötehtävä} placeholder="Työtehtävä"
                    onChange={({ target }) => setTyötehtävä(target.value)} required />
            </div>

            <button className="login-button" type="submit" style={{ background: 'green' }}>Tallenna</button>

            <button className="cancel-button" onClick={() => setMuokkaustila(false)} style={{ background: 'red' }}>
            Peru</button>
        </form>
    )
}

export default TyomaatEdit