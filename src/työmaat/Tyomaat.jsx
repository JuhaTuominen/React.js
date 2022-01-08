import React, { useState } from 'react'
import '../App.css'

const Työmaat = ({ työmaat, handleDeleteClick, handleEditClick }) => {

    const [näytäEnemmän, setNäytäEnemmän] = useState(false)

    return(
        <div>
            <h3><div onClick={() => setNäytäEnemmän(!näytäEnemmän)}>
                <p>Työkohde {työmaat.työkohde}, ID {työmaat.työmaaId}</p>
                </div>
                
                <button className="nappi2" id='poisto' onClick={() => handleDeleteClick(työmaat.työmaaId)}>Poista</button>
                <button className="nappi3" onClick={() => handleEditClick(työmaat)}>Muokkaa</button>
            </h3>

            {näytäEnemmän && <div className="customerWindow">
                <table>
                    <thead>
                        <tr>
                            <th>Työkohde</th>
                            <th>Työtehtävä</th>
                            <th>Työmaa ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{työmaat.työkohde}</td>
                            <td>{työmaat.työtehtävä}</td>
                            <td>{työmaat.työmaaId}</td>

                        </tr>
                    </tbody>
                </table></div>}

        </div>
    )

}

export default Työmaat