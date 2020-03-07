import React from 'react'
import './final.css'

const FinalResult = ({ candidates }) => (
    <div id="final">
        <h1>Election Day!</h1>
        <p>The game is over. Democracy wins!</p>
        <table>
            <tr><th>name</th><th>polling</th><th>turnout modifier</th><th>votes</th></tr>
            {candidates.map(candidate =>
                <tr>
                    <td>{candidate.name}</td>
                    <td>{candidate.stats.polling}</td>
                    <td>1.00</td>
                    <td>{candidate.stats.polling * 1014 }</td>
                </tr>
            )}
        </table>
    </div>
)

export default FinalResult