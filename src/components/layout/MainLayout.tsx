import React from 'react'
import Header from './Header'


interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  // const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {/* <aside
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } border-r border-gray-200 bg-white`}
      >
        <Sidebar />
      </aside> */}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white shadow-sm">
          <Header />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>

      {/* Footer 
      <footer className="border-t border-gray-200 bg-white p-4 text-center text-sm text-gray-500">
        <Footer />
      </footer>*/}
      </div>
    </div>
  )
}