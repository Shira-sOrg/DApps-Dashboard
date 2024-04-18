import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home'
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()


function App() {
  return (
    <div style={{backgroundColor: "rgb(249, 250, 251)"}}>
    <QueryClientProvider client={queryClient}>
      <Router>
          <Routes>
            <Route path='/' element={<Home />}/>
          </Routes>
      </Router>
    </QueryClientProvider>
    </div>
  );
}

export default App;