import React from 'react'

import {Navbar, CategorySideBar} from './components'
import Routes from './routes'
//
const App = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Routes />
      </div>
    </div>
  )
}

export default App
