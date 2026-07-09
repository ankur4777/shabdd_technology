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

  return (
    <div className='global-notification-overlay'>
      <div className={`global-notification-container ${notification.type}`}>
        <div className='global-subcontainer'>
          <img className='global-notification-icon' src={notification.image} alt={notification.type} />
          <h3>{notification.message}</h3>
          <button className='global-notification-close' onClick={onDismiss} aria-label='Close notification'>×</button>
        </div>
      </div>
    </div>
  )
}

export default GlobalNotificationUI
