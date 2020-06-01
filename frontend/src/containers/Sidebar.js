import React from 'react';
import DocumentContext, { UPDATE_CURRENT_DOCUMENT } from '../DocumentContext';


function Sidebar() {
    const contextVal = React.useContext(DocumentContext);
    const {docTitle} = contextVal.state;
    const createNew = () => {
        console.log('--->>>', docTitle)
    }
    return (
        <div>
            <button onClick={createNew}> New Doc ➕ </button>
        </div>
    )
}

export default Sidebar;