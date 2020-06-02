import React from 'react';
import DocumentContext from '../DocumentContext';

function AllRef() {
    const contextVal = React.useContext(DocumentContext);

    const { resources } = contextVal.state;

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
                                <h5>item.title</h5>
                                <p>item.body</p>
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