import React from 'react';
import DocumentContext, 
{ 
    UPDATE_CURRENT_DOCUMENT, 
    NEW_DOCUMENT_CREATED,
    UPDATE_SINGLE_DOCUMENT
} from '../DocumentContext';
import { create, update } from '../services/document.service'

function EditDoc() {
    const [loading, setLoading] = React.useState(false)
    const contextVal = React.useContext(DocumentContext);
    const {docTitle, docBody, selectedDoc} = contextVal.state;

    const handleInputChange = event => {
        const {name, value} = event.target
        contextVal.updateState({type: UPDATE_CURRENT_DOCUMENT, payload: {name, value}})
    }

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true)
        let payload = {
            title: docTitle,
            body: docBody
        }

        // Create if it is a new Document update otherwise
        if(selectedDoc === 'unsaved') {
            const res = await create(payload)
            if(res.success) {
                contextVal.updateState({type: NEW_DOCUMENT_CREATED, payload: res.data})
            }
        } else {
            payload.id = selectedDoc
            const res = await update(payload)
            if(res.success) {
                // update existing document
                contextVal.updateState({type: UPDATE_SINGLE_DOCUMENT, payload: res.data})
                // contextVal.updateState({type: NEW_DOCUMENT_CREATED, payload: res.data});
            }
        }
        setLoading(false)
        
    }
    if(!selectedDoc || selectedDoc === '') {
        return <div>Create a new Document or select an existing Document to get started</div>
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title
                <input
                    name="docTitle"
                    type="text"
                    value={docTitle}
                    onChange={handleInputChange} />
            </label>
            <br />
            <label>
                Body
                <textarea
                    name="docBody"
                    type="text"
                    value={docBody}
                    onChange={handleInputChange} />
            </label>
            <br />
            <input type="submit" value="Save" />
            {selectedDoc !== '' && selectedDoc !== 'unsaved' ? (
                <button>Delete 🗑️</button>
            ) : null}
        </form>
    )
}

export default EditDoc;