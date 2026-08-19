import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { checkSession } from '../store/authSlice'

function ProtectedRoute() {
  const dispatch = useDispatch()
  const { isLoggedIn, checkedSession } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!checkedSession) dispatch(checkSession())
  }, [dispatch, checkedSession])

  // Dok proveravamo da li admin već ima aktivnu sesiju (npr. posle refresh-a)
  if (!checkedSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
