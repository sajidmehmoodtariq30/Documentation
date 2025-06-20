import React from 'react'

const Sidebar = ({ currentSection, setCurrentSection, darkMode }) => {
  const sections = [
    {
      id: 'overview',
      title: 'Overview & Integration',
      icon: '🎯',
      description: 'Project overview and integration matrix'
    },
    {
      id: 'architecture',
      title: 'Architecture & Specs',
      icon: '🏗️',
      description: 'Technical architecture and specifications'
    },
    {
      id: 'implementation-1',
      title: 'Implementation (Steps 1-6)',
      icon: '🚀',
      description: 'Initial setup and core development'
    },
    {
      id: 'implementation-2',
      title: 'Implementation (Steps 7-11)',
      icon: '⚡',
      description: 'Advanced features and integration'
    },
    {
      id: 'testing',
      title: 'Testing & Deployment',
      icon: '🧪',
      description: 'Testing strategies and deployment guides'
    },
    {
      id: 'roadmap',
      title: 'Advanced Features & Roadmap',
      icon: '🗺️',
      description: 'Future enhancements and roadmap'
    }
  ]

  const projects = [
    {
      id: 'cortex',
      title: 'CORTEX AI Assistant',
      icon: '🧠',
      color: 'text-blue-500'
    },
    {
      id: 'sentineldb',
      title: 'SentinelDB',
      icon: '🛡️',
      color: 'text-green-500'
    },
    {
      id: 'cerebro',
      title: 'Cerebro Shell',
      icon: '💭',
      color: 'text-purple-500'
    },
    {
      id: 'codexa',
      title: 'Codexa IDE',
      icon: '💻',
      color: 'text-orange-500'
    }
  ]

  return (
    <aside className={`w-80 ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border-r flex flex-col h-full`}>
      
      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Documentation Sections
          </h2>
          
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                  currentSection === section.id
                    ? darkMode
                      ? 'bg-blue-900 text-blue-100 shadow-lg'
                      : 'bg-blue-50 text-blue-900 shadow-lg'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">
                    {section.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-tight">
                      {section.title}
                    </p>
                    <p className={`text-xs mt-1 leading-tight ${
                      currentSection === section.id
                        ? darkMode
                          ? 'text-blue-200'
                          : 'text-blue-700'
                        : darkMode
                          ? 'text-gray-400'
                          : 'text-gray-500'
                    }`}>
                      {section.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Project Quick Links */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <h2 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Project Components
          </h2>
          
          <div className="space-y-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`p-3 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{project.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${project.color}`}>
                      {project.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className={`text-sm font-semibold mb-3 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Documentation Progress
          </h3>
          
          <div className="space-y-2">
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Implementation Status
            </div>
            <div className={`w-full h-2 rounded-full ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <div 
                className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-300"
                style={{ width: '35%' }}
              ></div>
            </div>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              35% Complete
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
