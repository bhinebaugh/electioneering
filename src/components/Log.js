import React from 'react';

function Log({ messages }) {
    return <pre>{messages.join('\n')}</pre>
}

export default Log