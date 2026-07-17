import React, { createContext, useContext, useState, useEffect } from 'react'
import './GlobalNotification.css'

const NotificationContext = createContext(null)

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    if (!notification) return
    const timeoutId = setTimeout(() => setNotification(null), Math.max(1000, notification.timeout || 3000))
    return () => clearTimeout(timeoutId)
  }, [notification])

  const showNotification = ({ message, image, type = 'success', timeout = 3000 }) => {
    setNotification({ message, image, type, timeout })
  }

  const hideNotification = () => setNotification(null)

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <GlobalNotificationUI notification={notification} onDismiss={hideNotification} />
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}

function GlobalNotificationUI({ notification, onDismiss }) {
  if (!notification) return null

  const iconSrc = notification.image || (notification.type === 'error' ? '/Global/Wrong.png' : '/Global/Correct.png')

  return (
    <div className='global-notification-overlay'>
      <div className={`global-notification-container ${notification.type}`}>
        <div className='global-subcontainer'>
          <div className='global-notification-icon-wrap'>
            <img className='global-notification-icon' src={iconSrc} alt={notification.type} />
          </div>
          <h3>{notification.message}</h3>
          <button className='global-notification-close' onClick={onDismiss} aria-label='Close notification'>×</button>
        </div>
      </div>
    </div>
  )
}

export default GlobalNotificationUI
