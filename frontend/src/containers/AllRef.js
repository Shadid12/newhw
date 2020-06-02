import React from 'react';
import DocumentContext from '../DocumentContext';
import { SERVER_URL } from '../config';

function AllRef() {
    const contextVal = React.useContext(DocumentContext);

    const { resources } = contextVal.state;

    const downloadFile = id => {
        window.open(SERVER_URL + 'resources/download/' + id)
    }

    return (
      <div className="container">
        <h2>Showing all references</h2>
        <p>Below is a list of all your references 📝</p>
        <div>
            {
                resources.map(item => {
                    if(item.type === 'link/text') {
                        return (
                            <div>
                                <span>📜</span>
                                <b>{item.title}</b> : 
                                <span>{item.body}</span>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                            <span>💾</span>
                            <b>{item.title}</b> : 
                            <button onClick={event => {
                                event.preventDefault()
                                downloadFile(item._id)
                            }}>Download ⬇️</button>
                            </div>
                        )
                    }
                })
            }
        </div>
      </div>
    );
}


export default AllRef;