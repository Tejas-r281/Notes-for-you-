import React from 'react'
import "./ListFile.css"

function ListFile() {
  return (
    <div className="status">
      <div className="pending shadow-lg p-3 mb-5 bg-white rounded">
      <h4 className="text-center text-primary">Pending</h4>
      <hr/>
    </div>
      <div className="accepted shadow-lg p-3 mb-5 bg-white rounded">
      <h4 className="text-center text-success">Accepted</h4>
      <hr/>
    </div>
      <div className="rejected shadow-lg p-3 mb-5 bg-white rounded">
      <h4 className="text-center text-muted">Rejected</h4>
      <hr/>
    </div>
    </div>
  )
}

export default ListFile