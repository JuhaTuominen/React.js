import React, { useState, useEffect } from 'react'
import '../App.css'
import TyömaatService from '../services/työmaat'
import Tyomaat from './Tyomaat'
import Message from '../Message'
import TyomaatEdit from './TyomaatEdit'
import TyomaatAdd from './TyomaatAdd'


const TyömaatList = () => {

    const [näytetäänkö, setNäytetäänkö] = useState(false)
    const [message, setMessage] = useState("")
    const [isPositive, setIsPositive] = useState(true)
    const [showMessage, setShowMessage] = useState(false)
    const [lisäysTila, setLisäystila] = useState(false)
    const [muokkausTila, setMuokkaustila] = useState(false)
    const [muokattavaTyömaat, setmuokattavaTyömaat] = useState({})
    const [työmaat, setTyömaat] = useState([])

    useEffect(() => {
        TyömaatService
            .getAll()
            .then(data => {
                setTyömaat(data)
            })
    }, [lisäysTila, näytetäänkö, muokkausTila])

    const handleDeleteClick = id => {


        const poistettava = työmaat.find(työmaat => työmaat.työmaaId === id)

        // Poiston varmistus kyselyikkuna
        const confirm = window.confirm(`Haluatko todella poistaa: ${poistettava.työkohde}:n pysyvästi?`)

        if (confirm) {

            TyömaatService.remove(id)
                .then(response => {

                    if (response.status === 200) {
                        setTyömaat(työmaat.filter(filtered => filtered.työmaaId !== id))

                        setMessage(`${poistettava.työkohde}:n poisto onnistui!`)
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

    const handleEditClick = työajat => {

        setmuokattavaTyömaat(työajat)
        setMuokkaustila(true)
    }
 
    return (
        <div>
            <h1>
                <nobr style={{ cursor: 'pointer' }} 
                    onClick={() => setNäytetäänkö(!näytetäänkö)}> Työmaat {''}
                <button style={{ cursor: 'pointer' }} className="nappi" onClick={() => setLisäystila(true)}>Lisää uusi</button>
                </nobr>
            </h1>

            {showMessage &&
                <Message message={message} isPositive={isPositive}/>
            }

            {
                työmaat && näytetäänkö && !lisäysTila === true && työmaat.map(työmaat =>
                   <Tyomaat työmaat={työmaat} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} />
                   
                )
            }

            {
                !työmaat && <p>Loading...</p>
            }

            {lisäysTila && <TyomaatAdd setLisäystila={setLisäystila} työmaat={työmaat} 
            setTyömaat={setTyömaat} setMessage={setMessage} 
            setShowMessage={setShowMessage}
                setIsPositive={setIsPositive} />}

            {muokkausTila && <TyomaatEdit setMuokkaustila={setMuokkaustila} 
            muokattavaTyömaat={muokattavaTyömaat} työmaat={työmaat} 
            setTyömaat={setTyömaat} setMessage={setMessage} 
            setShowMessage={setShowMessage}
                setIsPositive={setIsPositive} />}

        </div>
    )


}

export default TyömaatList