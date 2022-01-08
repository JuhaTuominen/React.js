import React, { useState } from 'react'
import '../App.css'

const Työajat = ({ työajat, handleDeleteClick, handleEditClick }) => {

    const [näytäEnemmän, setNäytäEnemmän] = useState(false)

    return(
        <div>
            <h3><div onClick={() => setNäytäEnemmän(!näytäEnemmän)}>
                <p>Työ ID {työajat.työId}. Työmaa ID {työajat.työmaaId}</p>
                </div>
                
                <button className="nappi2" id='poisto' onClick={() => handleDeleteClick(työajat.työId)}>Poista</button>
                <button className="nappi3" onClick={() => handleEditClick(työajat)}>Muokkaa</button>
            </h3>

            {näytäEnemmän && <div className="customerWindow">
                <table>
                    <thead>
                        <tr>
                            <th>Tekijä ID</th>
                            <th>Alkamisaika</th>
                            <th>Päättymisaika</th>
                            <th>Työ ID</th>
                            <th>Työmaa ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{työajat.tekijäId}</td>
                            <td>{työajat.alkamisaika}</td>
                            <td>{työajat.päättymisaika}</td>
                            <td>{työajat.työId}</td>
                            <td>{työajat.työmaaId}</td>
                        </tr>
                    </tbody>
                </table></div>}

        </div>
    )

}

export default Työajat