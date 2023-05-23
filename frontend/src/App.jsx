/**
 * Team 13: Alex Wang 1427869, Ka Shun Carson Young 1086178, Eldon Yeh 1276574, Yukash Sivaraj 1054297
 */
import * as React from 'react';
import './App.css'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom';
import TwitterPage from './components/TwitterPage.jsx'
import MastodonPage from './components/MastodonPage.jsx'

function App() {


  return (
    <div className='App'>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/twitter" element={<TwitterPage/>} />
        <Route path="/mastadon" element={<MastodonPage/>} />
        {/* <Route path="/twitter-melbourne" element={<TwitterMelbournePage/>} /> */}
        <Route element={null} />
    </Routes>
    </div>
  )
}

export default App
