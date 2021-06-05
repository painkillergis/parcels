import './Notifications.css'

function Notifications({ children }: { children: any }) {
  return (
    <div
      id="notifications"
      style={{
        position: 'fixed',
        boxSizing: 'border-box',
        padding: '1em',
        bottom: 0,
      }}
    >
      {children}
    </div>
  )
}

function Notification({
  dismiss,
  message,
}: {
  dismiss: () => void
  message?: string
}) {
  return (
    <div
      className="notification"
      style={{
        position: 'relative',
        visibility: message ? 'visible' : 'hidden',
        backgroundColor: '#EEE',
        color: 'black',
        borderRadius: '0.25em 0 0 0.25em',
        filter: 'drop-shadow(0.0625em 0.0625em 0.125em #666)',
      }}
    >
      <div
        style={{
          margin: '0.5em',
          display: 'inline-block',
        }}
      >
        {message}
      </div>
      <button
        style={{
          position: 'absolute',
          height: '100%',
          padding: '0 0.375em',
          border: 0,
          borderRadius: '0 0.25em 0.25em 0',
          backgroundColor: '#FAA',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
        onClick={dismiss}
      >
        &times;
      </button>
    </div>
  )
}

export default Notifications
export { Notification }
