import React from 'react';
import './resources-list.css';

function ResourcesList({ resources }) {
    return (
        <ul className="resources-list">
            {Object.keys(resources).map(r =>
                <li key={r} className={`resource-item ${r}`}>
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