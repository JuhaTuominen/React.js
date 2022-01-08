import React, { useState } from 'react'
import '../App.css'
import TyömaatServices from '../services/työmaat'

const TyoamaatAdd = ({ setLisäystila, setTyömaat, työmaat, setMessage, setShowMessage,
    setIsPositive }) => {

    // State määritykset

    const [newTyökohde, setNewTyökohde] = useState('')
    const [newTyötehtävä, setNewTyötehtävä] = useState('')

    // Lomakkeen onSubmit tapahtumankäsittelijä

    const submitTyömaat = (event) => {
        event.preventDefault()
        var newTyömaat = {
            Työkohde: newTyökohde,
            Työtehtävä: newTyötehtävä
        }

        TyömaatServices
            .create(newTyömaat)
            .then(response => {

                if (response.status === 200) {
                    setTyömaat(työmaat.concat(newTyömaat))
                    setMessage(`Lisätty ${newTyömaat.Työkohde}`)
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
                    4000
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
        <form onSubmit={submitTyömaat}>

            {/* inputien tapahtumankäsittelijöissä on määritelty funktio, jotka saa parametrikseen kyseisen
            input elementin target tiedon. Funktiot kutsuvat set state hookia parametrina target.value */}
            <div>
                <input type="text" value={newTyökohde} placeholder="Työkohde"
                    onChange={({ target }) => setNewTyökohde(target.value)} required />
            </div>

            <div>
                <input type="text" value={newTyötehtävä} placeholder="Työtehtävä"
                    onChange={({ target }) => setNewTyötehtävä(target.value)} required />
            </div>

            <button className="login-button" type="submit" style={{ background: 'green' }}>Tallenna</button>

            <button className="cancel-button" onClick={() => setLisäystila(false)} style={{ background: 'red' }}>
            Peru</button>
        </form>
    )
}

export default TyoamaatAdd