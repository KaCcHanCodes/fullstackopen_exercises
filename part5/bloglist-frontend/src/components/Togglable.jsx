import { useState } from 'react'

const Togglable = (prop) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none': '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{prop.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {prop.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable