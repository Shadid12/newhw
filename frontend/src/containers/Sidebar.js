import React from 'react';
import DocumentContext, { CREATE_NEW_DOC } from '../DocumentContext';
import './side-bar.css';


function Sidebar() {
    const [selectedDoc, setSelectedDoc] = React.useState(false)

    const contextVal = React.useContext(DocumentContext);
    const {docTitle} = contextVal.state;
    const createNew = () => {
        setSelectedDoc(true);
        contextVal.updateState({type: CREATE_NEW_DOC})
    }
    return (
        <div>
            {selectedDoc ? <h3>{docTitle ? docTitle : 
                <div className='empty-doc'>Document title cannot be null</div>
            }</h3> : 
            <h3>Select or Create a new Doc 👇</h3>}
            
            <button onClick={createNew}> New Doc ➕ </button>
        </div>
    )
}

export default Sidebar;