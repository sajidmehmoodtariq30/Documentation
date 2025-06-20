import React, { useState, useEffect } from 'react'

const Header = ({ 
  darkMode, 
  setDarkMode, 
  currentSection, 
  setCurrentSection,
  searchQuery,
  setSearchQuery,
  searchResults,
  setSearchResults,
  showSearch,
  setShowSearch
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false)

  // Close export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showExportMenu && !event.target.closest('.export-menu')) {
        setShowExportMenu(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showExportMenu])

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.length > 2) {
      setShowSearch(true)
      // This will be handled by MainContent component
    } else {
      setShowSearch(false)
      setSearchResults([])
    }
  }

  // Export to PDF functionality
  const exportToPDF = () => {
    const printContent = document.getElementById('main-content')
    if (printContent) {
      const originalTitle = document.title
      document.title = 'AI Development Ecosystem Documentation'
      
      // Create a new window for printing
      const printWindow = window.open('', '_blank')
      printWindow.document.write(`
        <html>
          <head>
            <title>AI Development Ecosystem Documentation</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1, h2, h3 { color: #333; }
              .bg-gray-800, .bg-gray-900 { background: white !important; color: black !important; }
              .text-white { color: black !important; }
              .border-gray-700 { border-color: #ccc !important; }
              pre { background: #f5f5f5; padding: 10px; border-radius: 5px; }
              @media print {
                body { margin: 0; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `)
      printWindow.document.close()
      
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
        document.title = originalTitle
      }, 500)
    }
    setShowExportMenu(false)
  }

  // Export to Markdown functionality
  const exportToMarkdown = () => {
    const sections = {
      overview: 'Overview & Integration',
      architecture: 'Architecture & Specifications', 
      implementation: 'Implementation Guide',
      diagrams: 'System Diagrams',
      testing: 'Testing & Deployment',
      roadmap: 'Advanced Features & Roadmap'
    }

    let markdown = `# AI Development Ecosystem Documentation\n\n`
    markdown += `> CORTEX AI • SentinelDB • Cerebro Shell • Codexa IDE\n\n`
    
    // Get content from each section (simplified version)
    for (const [key, title] of Object.entries(sections)) {
      markdown += `## ${title}\n\n`
      markdown += `*Content available in the interactive documentation.*\n\n`
    }
    
    markdown += `---\n\n`
    markdown += `*Generated from AI Development Ecosystem Documentation*\n`
    markdown += `*Date: ${new Date().toLocaleDateString()}*\n`
    
    // Create and download file
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-ecosystem-documentation.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    setShowExportMenu(false)
  }
  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <header className={`${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border-b sticky top-0 z-50 backdrop-blur-sm bg-opacity-95`}>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setCurrentSection('overview')}
          >
            <div className="text-3xl">🚀</div>
            <div>
              <h1 className={`text-xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                AI Development Ecosystem
              </h1>
              <p className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                CORTEX • SentinelDB • Cerebro • Codexa
              </p>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Box */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className={`block w-64 pl-10 pr-10 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setShowSearch(false)
                  }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md transition-colors ${
                darkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title="Toggle theme"
            >
              {darkMode ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>            {/* Export Menu */}
            <div className="relative export-menu">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className={`p-2 rounded-md transition-colors ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title="Export Documentation"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
              
              {showExportMenu && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}>
                  <div className="py-1">
                    <button
                      onClick={exportToPDF}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        darkMode 
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center">
                        <svg className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Export as PDF
                      </div>
                    </button>
                    <button
                      onClick={exportToMarkdown}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        darkMode 
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center">
                        <svg className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export as Markdown
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* GitHub Link */}
            <a
              href="https://github.com/your-username/ai-ecosystem"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-md transition-colors ${
                darkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title="GitHub Repository"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
