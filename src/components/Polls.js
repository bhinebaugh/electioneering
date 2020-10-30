import React from 'react';
import './polls.css';

function Polls(props) {
    const rows = (
        <tbody>
            { Object.entries(props.polling).map(p =>
                <tr>
                    <td class="candidate-name">{p[0]}</td>
                    {p[1].map(i => <td>{i}%</td>)}
                </tr>
            )}
        </tbody>
    );

    return (
        <table>
            <thead>
                <tr>
                <th></th>
                <th>start</th>
                {[...Array(props.campaignLength)].map((i,n) =>
                    <th colspan="2">week {n+1}</th>
                )}
                <th>election</th>
                </tr>
            </thead>
            {rows}
        </table>
    )
}

export default Polls;