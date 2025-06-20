import React, { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'

const App = () => {
  const [currentSection, setCurrentSection] = useState('overview')
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex flex-col h-screen">
        <Header 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
        
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            darkMode={darkMode}
          />
          
          <main className="flex-1 overflow-y-auto">
            <MainContent 
              currentSection={currentSection}
              darkMode={darkMode}
            />
          </main>
        </div>
        
      </div>
    </div>
  )
}

export default App