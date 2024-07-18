import classNames from 'classnames'
import React  from 'react'
import "./Button.css"

const Button = ({isDisabled, isLightStyle, onClick, text="default", customStyles={}}) => {
  const btnEnabledDisabled = !isDisabled ? "btn-enable" : "btn-disabled"
  const btnDarkOrLightStyle = !isLightStyle ? "btn-darkStyle" : "btn-lightStyle"
  return (
    <div>
      <button 
        className={classNames('btn', btnDarkOrLightStyle, btnEnabledDisabled)}
        onClick={onClick}
        disabled={isDisabled}
        style={customStyles}
        >
          {text}
      </button>
    </div>
  )
}

export default Button