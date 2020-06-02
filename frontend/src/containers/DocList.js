import React from 'react';
import DocumentContext, {EDIT_DOCUMENT} from '../DocumentContext';

function DocList() {
    const contextVal = React.useContext(DocumentContext);
    const { documents } =  contextVal.state;

    React.useEffect(() => {
    },[documents])

    const editDoc = docItem => {
        contextVal.updateState({type: EDIT_DOCUMENT, payload: docItem});
    }

    return(
        <div>
            {documents.map(item => (
                <span key={item._id}>
                    <span>{item.title}</span>
                    <button onClick={() => editDoc(item)}>Edit ✏️</button>
                </span>
            ))}
        </div>
    )
}

export default DocList;