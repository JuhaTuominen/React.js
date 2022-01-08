import React, { useState } from 'react'
import '../App.css'
import TyöajatService from '../services/työajat'

const TyöajatAdd = ({ tekijät, työmaat, setLisäystila, setTyöajat, työajat, setMessage, setShowMessage,
    setIsPositive }) => {

    // State määritykset

    const [newTyömaaId, setTyömaaId] = useState('')
    const [newTekijäId, setTekijäId] = useState('')
    const [newAlkamisAika, setAlkamisAika] = useState('')
    const [newPäättymisAika, setPäättymisAika] = useState('')


    // Lomakkeen onSubmit tapahtumankäsittelijä

    const submitTyöaika = (event) => {
        event.preventDefault()
        var newTyöajat = {
            työmaaId: newTyömaaId, 
            tekijäId: newTekijäId,
            alkamisAika: newAlkamisAika,
            päättymisAika: newPäättymisAika

        }

        TyöajatService
            .create(newTyöajat)
            .then(response => {

                if (response.status === 200) {
                    setTyöajat(työajat.concat(newTyöajat))
                    setMessage(`Lisätty ${newTyöajat.työmaaId}`)
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
                    6000
                )
            })

            setTimeout(() => {
                setLisäystila(false)
            }, 1000
            )

    }
    // Komponentti palauttaa käyttöliittymään form elementin
    // Lisätty required 2 ensimmäiseen inputiin
        console.log(työmaat)
        let työmaaLista = [{työmaaId: 'valitse', työkohde: '', työtehtävä: ''}] // Dropdown listausta
        työmaat.map (t => työmaaLista.push(t))

        let tekijäLista = [{tekijäId: 'valitse', työkohde: '', työtehtävä: ''}]
        tekijät.map (t => tekijäLista.push(t))
            return (

        <form onSubmit={submitTyöaika}>

            {/* inputien tapahtumankäsittelijöissä on määritelty funktio, jotka saa parametrikseen kyseisen
            input elementin target tiedon. Funktiot kutsuvat set state hookia parametrina target.value */}
            
            <label for="työmaat">Valitse työmaa ID: </label>
                <select name="työmaat" id="työmaat" onChange={({ target }) => setTyömaaId(target.value)} required> 
                    {
                      työmaat && työmaaLista.map(t => <option value={t.työmaaId}>{t.työmaaId}</option>) // yksinkertainen dropdown lista työajan lisäämistä helpottamiseksi
                    }
                </select>
            
            <div>
                <output value={newTyömaaId} placeholder="Työmaa Tunnus"
                    onChange={({ target }) => setTyömaaId(target.value)} required />
            </div>

            <label for="tekijät">Valitse tekijän ID: </label>
                <select name="tekijät" id="tekijät" onChange={({ target }) => setTekijäId(target.value)} required> 
                    {
                      tekijät && tekijäLista.map(e => <option value={e.tekijäId}>{e.tekijäId}</option>)
                    }
                </select>

            <div>
                <output value={newTekijäId} placeholder="Tekijän Tunnus"
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

            <button className="cancel-button" onClick={() => setLisäystila(false)} style={{ background: 'red' }}>
            Peru</button>
        </form>
    )
}

export default TyöajatAdd