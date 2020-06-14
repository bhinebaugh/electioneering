import React from 'react'
import './final.css'

const FinalResult = ({ candidates }) => {
    const plurality = candidates.reduce( (p, c, i) => c > p ? c : p, 0)
    const winner = candidates.reduce((a,b) => a.polling > b.polling ? a.id : b.id)
    return(
        <div id="overlay">
        <section id="final">
            <header>
                <h1>Election Day Results</h1>
            </header>
            <div>
                <p>Polls have closed and votes have been tallied</p>
                <table>
                    <tr><th>name</th><th>polling</th><th>turnout modifier</th><th>votes</th></tr>
                    {candidates.map(candidate =>
                        <tr className={candidate.id == winner ? "winner" : "also-ran"}>
                            <td>{candidate.name}</td>
                            <td>{candidate.stats.polling}%</td>
                            <td>1.00</td>
                            <td>{(candidate.stats.polling * 1014).toLocaleString() }</td>
                        </tr>
                    )}
                </table>
            </div>
        </section>
        </div>
    )
}

export default FinalResult