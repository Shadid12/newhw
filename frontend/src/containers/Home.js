import React from 'react';
import Sidebar from './Sidebar';
import EditDoc from './EditDoc';
import ClipNav from './ClipNav';

import '../app.css'

function Home() {

    return (
      <div className="container home">
        <Sidebar />
        <EditDoc />
        <ClipNav />
      </div>
    );
}

export default Home;