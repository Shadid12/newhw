import React from 'react';
import Sidebar from './Sidebar';
import EditDoc from './EditDoc';
import ClipNav from './ClipNav';

function Home() {

    return (
      <div>
        <Sidebar />
        <EditDoc />
        <ClipNav />
      </div>
    );
}

export default Home;