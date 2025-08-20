const errorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div className='error'>{message}</div>
}

const notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return  <div className='create'>{ message }</div>
}

export default { errorNotification, notification }