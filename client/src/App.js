import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/container/Header'
import Footer from './components/container/Footer'
import Sections from './components/pages/Sections'
import Students from './components/pages/Students'
import Student from './components/pages/Student'
import Error from './components/pages/Error'
import './App.css'


function App(props) {
    return (
        <Router>
          <Header />
            <Routes>
              <Route path='/' element={<Sections />} />
              <Route path='/sections' element={<Sections />} />
              <Route path='/students/:sectionID' element={<Students />} />
              <Route path='/student/:studentID' element={<Student />} />
              <Route path='*' element={<Error />} />
            </Routes>
          <Footer />
        </Router>
    )
}

export default App