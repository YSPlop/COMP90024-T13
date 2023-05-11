import * as React from 'react';
import './App.css'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom';
import TwitterPage from './components/TwitterPage.jsx'
import MastodonPage from './components/MastodonPage.jsx'

//import browser-router (react-router)
function App() {


  return (
    <div className='App'>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/twitter" element={<TwitterPage/>} />
        <Route path="/mastadon" element={<MastodonPage/>} />
        <Route element={null} />
    </Routes>
    </div>
  )
}

export default App
