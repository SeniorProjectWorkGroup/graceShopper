import React from 'react'

import {Navbar, CategorySideBar} from './components'
import Routes from './routes'
import SideBarAd from './components/SideBarAd'

//
const App = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Routes />
      </div>
      <SideBarAd />
    </div>
  )
}

export default App
