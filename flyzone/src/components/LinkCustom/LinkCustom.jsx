import React from 'react'
import { Link } from 'react-router-dom'

const LinkCustom = ({to, title}) => {
  return (
    <Link to={to}>{title}</Link>
  )
}

export default LinkCustom