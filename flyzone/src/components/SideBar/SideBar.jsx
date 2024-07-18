import React, { useState } from 'react'
import './SideBar.css'
import {sidebarData} from "../SideBar/SidebarData"
import { Link } from 'react-router-dom'


const SideBar = ({currentUserId}) => {
    const [sideBarActiveId, setSideBarActiveId] = React.useState(undefined)

   function toggleStyle(id) {
    setSideBarActiveId(id)
  }
console.log(currentUserId)
  return (
    <div className='sidebar_main'>
        <div className='sidebar_menu'>
            {sidebarData.data.map((data) => {
              let dynamicPath
              if(data.path.includes('[:id]')){
                dynamicPath = data.path.replace('[:id]', currentUserId)
                console.log(dynamicPath)
              }
              return (
                <div 
                  title={data.title} 
                  className={sideBarActiveId !== data.id ? 'sidebar_icon_div' : 'sidebar_icon_div_active'} 
                  onClick={() => toggleStyle(data.id)}
                >
                  <Link className='sidebar_link' to={dynamicPath ? dynamicPath : data.path}>{data.icon}</Link>
                </div>
            )})}
        </div>
    </div>
  )
}

export default SideBar