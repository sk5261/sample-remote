
  import React, { useState } from 'react';
  import { Routes, Route, Navigate } from 'react-router-dom';


  const App: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Handle sidebar toggle
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
    // Handle closing sidebar
    const closeSidebar = () => {
      setSidebarOpen(false);
    };
    return (
      <div className="flex flex-col h-screen">

      <Routes>
        <Route path="/" element={      
           <div>
             This is the sample remote app.
           </div>
          } />
  
     
      </Routes>
      </div>
    );
  };

  export default App; 