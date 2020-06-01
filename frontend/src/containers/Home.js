import React from 'react';
import DocumentContext, { UPDATE_CURRENT_DOCUMENT } from '../DocumentContext';
import Resource from './Resource';
import Sidebar from './Sidebar';

function Home() {

    const contextVal = React.useContext(DocumentContext);
    const {docTitle, docBody} = contextVal.state;

    const handleInputChange = event => {
        const {name, value} = event.target
        contextVal.updateState({type: UPDATE_CURRENT_DOCUMENT, payload: {name, value}})
    }

    const handleSubmit = event => {
        event.preventDefault();
        // console.log('Sumbit state', state)
    }

    return (
      <div>
        <Sidebar />
        <h1>New Document</h1>
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
            <input type="submit" value="Submit" />
        </form>
        <Resource />
      </div>
    );
}

export default Home;