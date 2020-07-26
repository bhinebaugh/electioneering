import React from 'react';
import './resources-list.css';

function ResourcesList({ resources, exceeded }) {
    return (
        <ul className="resources-list">
            {Object.keys(resources).map(r =>
                <li key={r} className={`resource-item ${r} ${exceeded.includes(r) ? 'warn' : ''}`}>
                    <dt>{r}
                    </dt>
                    <dd>
                        {resources[r]}
                    </dd>
                </li>
            )}
        </ul>
    )
}

export default ResourcesList;