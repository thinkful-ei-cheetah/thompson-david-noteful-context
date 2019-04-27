import React from 'react'
import './NotefulForm.css'
import PropTypes from 'prop-types'

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
NotefulForm.propTypes = { onSubmit: PropTypes.func }