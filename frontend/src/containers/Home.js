import React from 'react';
import Resource from './Resource';
import Sidebar from './Sidebar';
import EditDoc from './EditDoc';

function Home() {

    return (
      <div>
        <Sidebar />
        <EditDoc />
        <Resource />
      </div>
    );
}

export default Home;