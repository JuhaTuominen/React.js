import React, { useState } from 'react'
import '../App.css'

const Tekijät = ({ tekijä, handleDeleteClick, handleEditClick }) => {

    const [näytäEnemmän, setNäytäEnemmän] = useState(false)

    return(
        <div>
            <h3>
                <div
                    onClick={() => setNäytäEnemmän(!näytäEnemmän)}>
                    <p>Tekijän nimi: {tekijä.tekijä}, ID {tekijä.tekijäId}</p>
                </div>
            
            <button className="nappi2" id='poisto' onClick={() => handleDeleteClick(tekijä.tekijäId)}>Poista</button>
            <button className="nappi3" onClick={() => handleEditClick(tekijä)}>Muokkaa</button>
            </h3>

            {näytäEnemmän && <div className="customerWindow">
                <table>
                    <thead>
                        <tr>
                            <th>Tekijä</th>
                            <th>Tekijä ID</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id='tekijä'>{tekijä.tekijä}</td>
                            <td>{tekijä.tekijäId}</td>

                        </tr>
                    </tbody>
                </table></div>}

        </div>
    )

}

export default Tekijät