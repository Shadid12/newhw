// import React from 'react';
// import DocumentContext, { UPDATE_CURRENT_DOCUMENT } from '../DocumentContext';

// function Resource() {
//     const [form, setForm] = React.useState(false)
//     const [type, setType] = React.useState('link')

//     const contextVal = React.useContext(DocumentContext);
//     const {resourceTitle, resourceBody} = contextVal.state;

//     const handleSubmit = event => {
//         event.preventDefault();

//         setForm(!form)
//     }

//     const handleInputChange = event => {
//         const {name, value} = event.target
//         contextVal.updateState({type: UPDATE_CURRENT_DOCUMENT, payload: {name, value}})
//     }

//     const handleTypeChange = event => {
//         setType(event.target.value);
//     }

//     return(
//     )
// }

// export default Resource;