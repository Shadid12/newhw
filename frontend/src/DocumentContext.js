import React from "react";
import { getAll } from './services/document.service';
import { getAllResouces } from './services/resource.service';

const DocumentContext = React.createContext();

export const DocumentContextConsumer = DocumentContext.Consumer;

// enums
export const UPDATE_CURRENT_DOCUMENT = 'UPDATE_CURRENT_DOCUMENT';
export const CREATE_NEW_DOC = 'CREATE_NEW_DOC';
export const NEW_DOCUMENT_CREATED = 'NEW_DOCUMENT_CREATED';
export const EDIT_DOCUMENT = 'EDIT_DOCUMENT';
export const UPDATE_SINGLE_DOCUMENT = 'UPDATE_SINGLE_DOCUMENT';
export const DELETE_SINGLE_DOCUMET = 'DELETE_SINGLE_DOCUMET';
export const UPDATE_RESOURCE = 'UPDATE_RESOURCE';
export const RELOAD_RESOURCES = 'RELOAD_RESOURCES';

const initialState = {
  docTitle: "Untitled*",
  docBody: "Edit your document",
  selectedDoc: "unsaved"
}

// TODO: Make it functional
export class DocumentContextProvider extends React.Component {
    state = {
      docTitle: "Untitled*",
      docBody: "Edit your document",
      resourceTitle: "",
      resourceBody: "",
      selectedDoc: "",
      resourceId: "unsaved",
      documents: [],
      resources: []
    };

    async componentDidMount() {
      const res = await getAll();
      if(!res.success) {
        alert('Server Error!! please reload page') // TODO handle error with UI friendly method
      }

      const resources = await getAllResouces();
      if(!resources.success) {
        alert('Failed to load resources, Please reload this page') // TODO handle error with UI friendly method
      }

      this.setState(prevState => ({
        ...prevState,
        documents: res.data,
        resources: resources.data
      }))
    }

    // Context Action
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
              selectedDoc: payload._id,
              documents: newDocuments
            }
          });
          break;
        case EDIT_DOCUMENT:
          this.setState(prevState => ({
            ...prevState,
            docTitle: payload.title,
            docBody: payload.body,
            selectedDoc: payload._id
          }))
          break;
        case UPDATE_SINGLE_DOCUMENT:
          this.setState(prevState => {
            const newDocuments = JSON.parse(JSON.stringify(prevState.documents)); 
            const index = newDocuments.findIndex((i) => i._id === payload._id);
            newDocuments[index] = payload
            return {
              ...prevState,
              documents: newDocuments
            }
          }); 
          break;
        case DELETE_SINGLE_DOCUMET:
          this.setState(prevState => {
            const newDocuments = JSON.parse(JSON.stringify(prevState.documents)); 
            const index = newDocuments.findIndex((i) => i._id === payload);
            newDocuments.splice(index, 1)
            return {
              ...prevState,
              documents: newDocuments
            }
          });
          break;
        case UPDATE_RESOURCE:
          this.setState(prevState => {
            return {
              ...prevState,
              resourceTitle: payload.title,
              resourceBody: payload.body,
              resourceId: payload._id
            }
          });
          break;

        case RELOAD_RESOURCES:
          this.setState(prevState => {
            const newResources = JSON.parse(JSON.stringify(prevState.resources)); 
            const index = newResources.findIndex((i) => i._id === payload._id);
            if(index > -1) {
              newResources[index] = payload
            } else {
              newResources.push(payload)
            }
            return {
              ...prevState,
              resources: newResources,
              resourceId: 'unsaved',
              resourceTitle: '', 
              resourceBody: ''
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