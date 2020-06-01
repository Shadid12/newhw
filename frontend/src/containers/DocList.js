import React from 'react';
import DocumentContext, {EDIT_DOCUMENT} from '../DocumentContext';

function DocList() {
    const contextVal = React.useContext(DocumentContext);
    const { documents } =  contextVal.state;
    React.useEffect(() => {
        console.log('--->', documents)
    },[documents])

    const editDoc = docItem => {
        contextVal.updateState({type: EDIT_DOCUMENT, payload: docItem});
    }

    return(
        <ul>
            {documents.map(item => (
                <li key={item._id}>
                    {item.title}
                    <button onClick={() => editDoc(item)}>Edit ✏️</button>
                </li>
            ))}
        </ul>
    )
}

export default DocList;