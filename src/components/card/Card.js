import React from 'react'

//alert msg show component
const Card = ({ children }) => {
  return (
    <div>
      <div className="alert alert-success" role="alert">
        {children}
      </div>
    </div>
  )
}

export default Card
