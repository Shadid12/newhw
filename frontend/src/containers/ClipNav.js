import React from 'react';
import { SERVER_URL } from '../config'
import DocumentContext, 
{ 
    UPDATE_CURRENT_DOCUMENT, 
    UPDATE_RESOURCE,
    RELOAD_RESOURCES,
    DELETE_RESOURCE
} from '../DocumentContext';
import {create, updateResource, deleteResource, downloadResource} from '../services/resource.service'

import './clip-nav.css';
import axios from 'axios';

function ClipNav() {
    const [uploadInfo, setUploadInfo] = React.useState({
        title: '',
        file: null
    });

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
        if(selectedDoc === 'unsaved') {
            alert('You must save your document first before you can attach references')
            return;
        }
        if(resourceTitle === "" || resourceBody === "") {
            alert('Please make sure to fill in title and body of your reference')
            return;
        }
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
                window.scrollTo(0, document.body.scrollHeight )
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
        contextVal.updateState({type: UPDATE_RESOURCE, payload: reference});
        window.scrollTo(0,0)
    }

    const deleteCurrent = async reference => {
        const res = await deleteResource(reference._id);
        if(res.success) {
            contextVal.updateState({type: DELETE_RESOURCE, payload: reference._id})
        }
    }

    const uploadFile = async event => {
        event.preventDefault();
        if(selectedDoc === 'unsaved') {
            alert('You must save your document first before you can attach references')
            return;
        }
        if(uploadInfo.title === '' || !uploadInfo.file) {
            alert('Can not upload file. Please make sure you have a file title and proper file format')
        }
        const data = new FormData();
        data.append('resourceFile', uploadInfo.file);
        data.append('title', uploadInfo.title);
        data.append('type', 'file');
        data.append('documentId', selectedDoc);
        
        try {
            const ress = await axios.post("http://localhost:5000/api/v1/resources", data, {});
            if(ress.data.success) {
                setUploadInfo({
                    title: '',
                    body: '',
                    file: ''
                });
                contextVal.updateState({type: RELOAD_RESOURCES, payload: ress.data.data})
            }
        } catch (error) {
            console.error('--->>>', error)
        }
    }

    const handleFileChange = event => {
        const file = event.target.files[0]
        setUploadInfo(prevState => ({
            ...prevState,
            file: file
        }))
    }

    const handleUploadInfo = event => {
        const {name, value} = event.target
        setUploadInfo(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const downloadFile = id => {
        window.open(SERVER_URL + 'resources/download/' + id)
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
            <h4>📁Upload a file📁</h4>
            <form onSubmit={uploadFile}>
                <label>
                    File Title
                    <input
                        name="title"
                        type="text"
                        value={uploadInfo.title}
                        onChange={handleUploadInfo} />
                </label>
                <input type="file" onChange={handleFileChange} />
                <button>Upload File</button>
            </form>
            <h4>🔎 Research References 🔎</h4>
            {
                resources.map(item => {
                    if(item.documentId === selectedDoc) {
                        if(item.type === 'link/text') {
                            return (
                                <div key={item._id}>
                                    <span>{item.title}</span> | 
                                    <button onClick={event => {
                                        event.preventDefault()
                                        editResource(item)
                                    }}>Edit ✏️</button>
                                    <button onClick={event => {
                                        event.preventDefault()
                                        deleteCurrent(item)
                                    }}>Delete 🗑️</button>
                                </div>
                            )
                        } else {
                            return (
                                <div key={item._id}>
                                    <span>{item.title}</span> | 
                                    <button onClick={event => {
                                        event.preventDefault()
                                        downloadFile(item._id)
                                    }}>Download ⬇️</button>
                                    <button onClick={event => {
                                        event.preventDefault()
                                        deleteCurrent(item)
                                    }}>Delete 🗑️</button>
                                </div>
                            )
                        }
                    }
                })
            }
        </div>
    )
}

export default ClipNav;