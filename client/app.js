import React from 'react'

import {Navbar, CategorySideBar} from './components'
import Routes from './routes'
//
const App = () => {
  return (
    <div>
      <Navbar />
      <CategorySideBar />
      <Routes />
    </div>
  )
}

export default App
