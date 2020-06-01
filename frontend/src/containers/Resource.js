import React from 'react';
import DocumentContext, { UPDATE_CURRENT_DOCUMENT } from '../DocumentContext';

function Resource() {
    const [form, setForm] = React.useState(false)
    const [type, setType] = React.useState('link')

    const contextVal = React.useContext(DocumentContext);
    const {resourceTitle, resourceBody} = contextVal.state;

    const handleSubmit = event => {
        event.preventDefault();

        setForm(!form)
    }

    const handleInputChange = event => {
        const {name, value} = event.target
        contextVal.updateState({type: UPDATE_CURRENT_DOCUMENT, payload: {name, value}})
    }

    const handleTypeChange = event => {
        setType(event.target.value);
    }

    return(
        <div>
        {
            form ? (
                <>
                
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
                    Select resource type:
                    <select value={type} onChange={handleTypeChange}>
                        <option value="link">Link/Text</option>
                        <option value="file">File</option>
                    </select>
                    </label>
                    <br />
                    {type === 'link' ? (
                        <label>
                            Body
                            <textarea
                                name="resourceBody"
                                type="text"
                                value={resourceBody}
                                onChange={handleInputChange} />
                        </label>
                    ) : <input type="file" />}
                    <br />
                    <input type="submit" value="Save Resource" />
                </form>
                
                </>
            ) : (
                <button onClick={() => setForm(!form)}>
                    Add New Resource +
                </button>
            )
        }
        </div>
    )
}

export default Resource;