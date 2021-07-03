interface LoadingProps {
  loading: Boolean
}

function Loading({ loading }: LoadingProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        visibility: loading ? 'visible' : 'hidden',
        position: 'fixed',
        fontSize: '4em',
        backgroundColor: '#444',
        color: 'white',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        loading
      </span>
    </div>
  )
}

export default Loading
