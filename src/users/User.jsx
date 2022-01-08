import React, { useState } from 'react'
import '../App.css'

const User = ({ user, handleDeleteClick, handleEditClick }) => {

    const [näytäEnemmän, setNäytäEnemmän] = useState(false)

    return (
        <>
            <h3><nobr
                onClick={() => setNäytäEnemmän(!näytäEnemmän)}
            >
                {user.käyttäjäNimi}

            </nobr>

                <button className="nappi2" onClick={() => handleDeleteClick(user.userId)}>Delete</button>

                <button className="nappi3" onClick={() => handleEditClick(user)}>Edit</button>

            </h3>

            {näytäEnemmän && <div className="customerWindow">
                <table>
                    <thead>
                        <tr>
                            <th>Käyttäjä nimi</th>
                            <th>Käyttäjän Turva Luokitus</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.käyttäjäNimi}</td>
                            <td>{user.turvaLuokitus}</td>
                        </tr>
                    </tbody>
                </table></div>}
        </>
    )
}

export default User