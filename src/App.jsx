import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'

const App = () => {
  const [currentSection, setCurrentSection] = useState('overview')
  const [darkMode, setDarkMode] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearch, setShowSearch] = useState(false)

  // Handle navigation from search results
  useEffect(() => {
    const handleNavigation = (event) => {
      const section = event.detail
      setCurrentSection(section)
      setShowSearch(false)
      setSearchQuery('')
    }
    
    window.addEventListener('navigateToSection', handleNavigation)
    return () => window.removeEventListener('navigateToSection', handleNavigation)
  }, [])

  // Make setCurrentSection available globally for search navigation
  useEffect(() => {
    window.setCurrentSection = setCurrentSection
    return () => {
      delete window.setCurrentSection
    }
  }, [])

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex flex-col h-screen">
        <Header 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
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
              searchQuery={searchQuery}
              searchResults={searchResults}
              showSearch={showSearch}
            />
          </main>
        </div>
        
      </div>
    </div>
  )
}

export default App