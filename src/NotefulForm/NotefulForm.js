import React from 'react'
import './NotefulForm.css'

export default function NotefulForm(props) {
  const { className, onSubmit,...otherProps } = props
  
  return (
    <form
      onSubmit={onSubmit}
      className={['Noteful-form', className].join(' ')}
      action='#'
      {...otherProps}
    />
  )
}
