import React from 'react';
import DocumentContext, 
{ 
    UPDATE_CURRENT_DOCUMENT, 
    UPDATE_RESOURCE,
    RELOAD_RESOURCES
} from '../DocumentContext';
import {create, updateResource} from '../services/resource.service'

import './clip-nav.css';

function ClipNav() {
    const contextVal = React.useContext(DocumentContext);
    const { 
        selectedDoc, 
        resourceTitle, 
        resourceBody, 
        resources,
        resourceId
    } = contextVal.state;
    
    const addNew = event => {
        event.preventDefault();
    }

    const handleSubmit = async event => {
        event.preventDefault();
        let payload = {
            title: resourceTitle,
            body: resourceBody,
            type: 'link/text',
            documentId: selectedDoc
        }
        if(resourceId === 'unsaved') {
            const res = await create(payload);
            // Reload Resources
            if(res.success) {
                contextVal.updateState({type: RELOAD_RESOURCES, payload: res.data})
            }
        } else {
            payload.id = resourceId;
            const res = await updateResource(payload);
            if(res.success) {
                contextVal.updateState({type: RELOAD_RESOURCES, payload: res.data})
            }
        }
    }

    const handleInputChange = event => {
        const {name, value} = event.target
        contextVal.updateState({type: UPDATE_CURRENT_DOCUMENT, payload: {name, value}})
    }

    const editResource = reference => {
     contextVal.updateState({type: UPDATE_RESOURCE, payload: reference})   
    }

    if(selectedDoc === '') {
        return (
            <div className='error-msg'>❗❗ Please select a document to add resources to it</div>
        )
    }

    return (
        <div className='clip'>
            {resourceId === 'unsaved' ? (
                <h3>Attach a new Resource to your Article</h3>
            ) : (
                <h3>Update resource {resourceTitle}</h3>
            )}
            <form onSubmit={handleSubmit}>

                <label>
                    Title
                    <input
                        name="resourceTitle"
                        type="text"
                        value={resourceTitle}
                        onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Body
                    <textarea
                        name="resourceBody"
                        type="text"
                        value={resourceBody}
                        onChange={handleInputChange} />
                </label>
                {resourceId === 'unsaved' ? (
                    <button >Attach Resource 📎</button>
                ) : (
                    <button >Update Resource 💾</button>
                )}
            </form>
            <h4>🔎 Research References 🔎</h4>
            {
                resources.map(item => {
                    if(item.documentId === selectedDoc) {
                        return (
                            <li key={item._id}>
                                <span>{item.title}</span> | 
                                <button onClick={event => {
                                    event.preventDefault()
                                    editResource(item)
                                }}>Edit ✏️</button>
                                <button>Delete 🗑️</button>
                            </li>
                        )
                    }
                })
            }
        </div>
    )
}

export default ClipNav;