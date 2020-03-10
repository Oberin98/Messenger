import React, { useEffect } from 'react'
import './Tooltip.css'
import { setAuthError } from '../../redux/actions/actions'
import { connect } from 'react-redux'

const Tooltip = (props) => {

  const { setAuthError, authErrorText } = props;

  useEffect(() => {
    setTimeout(() => {
      setAuthError()
    }, 1700)
  }, [])

  return (
    <div className='authError'>
      <p>{authErrorText}</p>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthError: state.isAuthError,
  authErrorText: state.authErrorText
})


export default connect(mapStateToProps, { setAuthError })(Tooltip)
