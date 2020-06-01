import React from "react";

const DocumentContext = React.createContext();

export const DocumentContextConsumer = DocumentContext.Consumer;

// enums
export const UPDATE_CURRENT_DOCUMENT = 'UPDATE_CURRENT_DOCUMENT';

export class DocumentContextProvider extends React.Component {
    state = {
      docTitle: "Default Title",
      docBody: "Default Body",
      resourceTitle: "New Resource",
      resourceBody: ""
    };
  
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