import React from "react";
import axios from "axios";
import {SERVER_URL} from './config'

const DocumentContext = React.createContext();

export const DocumentContextConsumer = DocumentContext.Consumer;

// enums
export const UPDATE_CURRENT_DOCUMENT = 'UPDATE_CURRENT_DOCUMENT';
export const CREATE_NEW_DOC = 'CREATE_NEW_DOC';
export const NEW_DOCUMENT_CREATED = 'NEW_DOCUMENT_CREATED';

const initialState = {
  docTitle: "Untitled*",
  docBody: "Edit your document",
  selectedDoc: "unsaved"
}

export class DocumentContextProvider extends React.Component {
    state = {
      docTitle: "Untitled*",
      docBody: "Edit your document",
      resourceTitle: "",
      resourceBody: "",
      selectedDoc: "",
      documents: []
    };

    async componentDidMount() {
      try {
        const res = await axios.get(SERVER_URL + 'documents');
        this.setState(prevState => ({
          ...prevState,
          documents: res.data.data
        }))
      } catch (error) {
        console.log('error', error)
      }
    }
  
    updateState = ({type, payload}) => {
      switch(type) {
        case UPDATE_CURRENT_DOCUMENT:
          const {name, value} = payload
          this.setState(prevState => ({
            ...prevState,
            [name]: value
          }))
          break;

        case CREATE_NEW_DOC: 
          this.setState(prevState => ({
            ...prevState,
            ...initialState
          }));
          break;
        case NEW_DOCUMENT_CREATED:
          this.setState(prevState => {
            const newDocuments = JSON.parse(JSON.stringify(prevState.documents)); 
            newDocuments.push(payload)
            return {
              ...prevState,
              documents: newDocuments
            }
          });
          break;
        default:
          break;
      }
    };
  
    render() {
      const state = this.state
      const updateState = this.updateState
      return (
        <DocumentContext.Provider value={{ state, updateState }}>
          {this.props.children}
        </DocumentContext.Provider>
      );
    }
}
  
export default DocumentContext;