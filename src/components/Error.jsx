import React from 'react'

const Error = () => {
  return (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
        {children}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}

export default Error