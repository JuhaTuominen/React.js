import React, { useState, useEffect } from 'react'
import '../App.css'
import TekijätService from '../services/tekijät'
import Tekijat from './Tekijat'
import Message from '../Message'
import TekijaEdit from './TekijaEdit'
import TekijatAdd from './TekijatAdd'

const TekijätList = () => {

    const [tekijät, setTekijät] = useState([]) // taulukollinen tekijä olioita
    const [näytetäänkö, setNäytetäänkö] = useState(false)
    const [lisäysTila, setLisäystila] = useState(false)
    const [muokkausTila, setMuokkaustila] = useState(false)
    const [muokattavaTekijä, setMuokattavaTekijä] = useState({}) // yksi tekijä olio
    const [message, setMessage] = useState("")
    const [isPositive, setIsPositive] = useState(true)
    const [showMessage, setShowMessage] = useState(false)



    useEffect(() => {
        TekijätService
            .getAll()
            .then(data => {
                setTekijät(data)
            })
    }, [lisäysTila,näytetäänkö, muokkausTila])

    const handleDeleteClick = id => {

        //Kaivetaan esiin koko tekijä olio jotta alertissa voidaan näyttää tekijän nimi id:n sijaan
        const poistettava = tekijät.find(tekijä => tekijä.tekijäId === id)

        // Poiston varmistus kyselyikkuna
        const confirm = window.confirm(`Haluatko todella poistaa: ${poistettava.tekijä}:n pysyvästi?`)

        if (confirm) {

            TekijätService.remove(id)
                .then(response => {

                    if (response.status === 200) {
                        // Poistetaan tekijä statesta
                        setTekijät(tekijät.filter(filtered => filtered.tekijäId !== id))

                        setMessage(`${poistettava.tekijä}:n poisto onnistui!`) //näytetään tekijän nimi
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

    // EDIT buttonin tapahtumakäsittelijä saa parametrin tekijä componentista
    const handleEditClick = tekijä => {

        setMuokattavaTekijä(tekijä)
        setMuokkaustila(true)
    }
 
    return (
        <div>
            <h1>
                <nobr style={{ cursor: 'pointer' }} 
                    onClick={() => setNäytetäänkö(!näytetäänkö)}> Tekijät {''}
                <button style={{ cursor: 'pointer' }} className="nappi" onClick={() => setLisäystila(true)}>Lisää uusi</button>
                </nobr>
            </h1>

            {showMessage &&
                <Message message={message} isPositive={isPositive}/>
            }

            {
                tekijät && näytetäänkö && !lisäysTila === true && tekijät.map(tekijä =>
                   <Tekijat tekijä={tekijä} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} />
                   
                )
            }

            { !tekijät && <p>Loading...</p>}
            
            {lisäysTila && <TekijatAdd setLisäystila={setLisäystila} tekijät={tekijät} 
            setTekijät={setTekijät} setMessage={setMessage} 
            setShowMessage={setShowMessage}
                setIsPositive={setIsPositive} />}

            {muokkausTila && <TekijaEdit setMuokkaustila={setMuokkaustila} 
            muokattavaTekijä={muokattavaTekijä} tekijät={tekijät} 
            setTekijät={setTekijät} setMessage={setMessage} setShowMessage={setShowMessage}
                setIsPositive={setIsPositive} />}

        </div>
    )


}

export default TekijätList