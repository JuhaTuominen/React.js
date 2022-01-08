import React, { useState, useEffect } from 'react'
import '../App.css'
import TyöajatService from '../services/työajat'
import Tyoajat from './Tyoajat'
import Message from '../Message'
import TyoajatEdit from './TyoajatEdit'
import TyoajatAdd from './TyoajatAdd'
import TyömaatService from '../services/työmaat'
import TekijätService from '../services/tekijät'


const TyöajatList = () => {

    const [search, setSearch] = useState("")
    const [työajat, setTyöajat] = useState([])
    const [työmaat, setTyömaat] = useState([])
    const [tekijät, setTekijät] = useState([])
    const [näytetäänkö, setNäytetäänkö] = useState(false)
    const [lisäysTila, setLisäystila] = useState(false)
    const [muokkausTila, setMuokkaustila] = useState(false)
    const [muokattavaTyöajat, setmuokattavaTyöajat] = useState({}) // yksi työajat olio
    const [message, setMessage] = useState("")
    const [isPositive, setIsPositive] = useState(true)
    const [showMessage, setShowMessage] = useState(false)



    useEffect(() => {
        TyöajatService
            .getAll()
            .then(data => {
                setTyöajat(data)
            })
    }, [näytetäänkö, muokkausTila])

    useEffect(() => {
        TyömaatService
            .getAll()
            .then(data => {
                setTyömaat(data)
            })
    }, [lisäysTila, näytetäänkö, muokkausTila])

    useEffect(() => {
        TekijätService
            .getAll()
            .then(data => {
                setTekijät(data)
            })
    }, [lisäysTila, näytetäänkö, muokkausTila])

        //Hakukentän onChange tapahtumankäsittelijä
        const handleSearchInputChange = (event) => {
            setNäytetäänkö(true)
            setSearch(event.target.value.toLowerCase())
        }

    const handleDeleteClick = id => {

        //Kaivetaan esiin koko työjat olio jotta alertissa voidaan näyttää companyName id:n sijaan
        const poistettava = työajat.find(työajat => työajat.työId === id)

        // Poiston varmistus kyselyikkuna
        const confirm = window.confirm(`Haluatko todella poistaa: ${poistettava.työId}:n pysyvästi?`)

        if (confirm) {

            TyöajatService.remove(id)
                .then(response => {

                    if (response.status === 200) {
                        // Poistetaan työajat statesta
                        setTyöajat(työajat.filter(filtered => filtered.työId !== id))

                        setMessage(`${poistettava.työId}:n poisto onnistui!`)
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

    // EDIT buttonin tapahtumakäsittelijä saa parametrin työajat componentista
    const handleEditClick = työajat => {

        setmuokattavaTyöajat(työajat)
        setMuokkaustila(true)
    }
 
    return (
        <div>
            <h1>
                <nobr style={{ cursor: 'pointer' }} 
                    onClick={() => setNäytetäänkö(!näytetäänkö)}> Työajat {''}
                <button style={{ cursor: 'pointer' }} className="nappi" onClick={() => 
                    setLisäystila(true)}>Lisää uusi</button>
                </nobr>
            </h1>

            {showMessage &&
                <Message message={message} isPositive={isPositive}/>
            }

            {!lisäysTila && !muokkausTila &&
                <input placeholder="Hae työ ID:llä" value={search} onChange={handleSearchInputChange} />
            }

            {
                työajat.length > -1 && näytetäänkö && lisäysTila === false && työajat.map(työajat =>{

                    if (search == 0 || search === null || search === undefined) {
                        return (
                            <Tyoajat key={työajat.työId} työajat={työajat}
                                handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} />
                        )
                    }

                    else if (työajat.työId == search) {
                        return (
                            <Tyoajat key={työajat.työId} työajat={työajat}
                                handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} />
                        )
                    }
                }
                )
            }

            {
                !työajat && <p>Loading...</p>
            }

            {lisäysTila && <TyoajatAdd setLisäystila={setLisäystila} työajat={työajat} 
            työmaat={työmaat} tekijät={tekijät}
            setTyöajat={setTyöajat} setMessage={setMessage} 
            setShowMessage={setShowMessage}
                setIsPositive={setIsPositive} />}

            {muokkausTila && <TyoajatEdit setMuokkaustila={setMuokkaustila} 
            muokattavaTyöajat={muokattavaTyöajat} työajat={työajat} 
            setTyöajat={setTyöajat} setMessage={setMessage} 
            setShowMessage={setShowMessage}
                setIsPositive={setIsPositive} />}

        </div>
    )


}

export default TyöajatList