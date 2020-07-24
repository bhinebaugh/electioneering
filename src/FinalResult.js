import React from 'react'
import './final.css'
import { render } from 'react-dom'

const VOTE_EQUIVALENT = 1000

const CandidateResult  = ({ candidate, won }) => {
    const { name, id, stats: { enthusiasm, polling } } = candidate
    const turnout = (1.00 + enthusiasm/100) * VOTE_EQUIVALENT
    const votes = polling * turnout
    return (
        <tr
            key={id}
            className={ won ? "winner" : "also-ran" }
        >
            <td>{name}</td>
            <td>{polling}%</td>
            <td>{enthusiasm}</td>
            <td>{turnout}</td>
            <td>{votes.toLocaleString() }</td>
        </tr>

    )
}

const FinalResult = ({ active, candidates, winner }) => {

    var resultsHtml =
    (
        <section id="final">
            <header>
                <h1>Election Day Results</h1>
            </header>
            <div>
                <p>The polls have closed and the votes have been tallied. Results are in:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Candidate</th>
                            <th>Final polling</th>
                            <th>Enthusiasm</th>
                            <th>Turnout</th>
                            <th>Total Votes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map(candidate =>
                            <CandidateResult
                                candidate={candidate}
                                won={candidate.id === winner}
                            />
                        )}
                    </tbody>
                </table>
                <form method="dialog">
                    <button value="reset">fine</button>
                </form>
            </div>
        </section>
    );


    return active ? <dialog id="overlay">{resultsHtml}</dialog> : null;

}

export default FinalResult