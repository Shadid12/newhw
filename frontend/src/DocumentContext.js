import React from "react";
import axios from "axios";
import {SERVER_URL} from './config'

const DocumentContext = React.createContext();

export const DocumentContextConsumer = DocumentContext.Consumer;

// enums
export const UPDATE_CURRENT_DOCUMENT = 'UPDATE_CURRENT_DOCUMENT';

export class DocumentContextProvider extends React.Component {
    state = {
      docTitle: "Untitled*",
      docBody: "Edit your document",
      resourceTitle: "Untitled*",
      resourceBody: "",
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