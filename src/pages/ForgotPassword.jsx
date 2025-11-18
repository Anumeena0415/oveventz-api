import React from 'react'
import { VendorUserForm } from '../components/VendorUserForm'

function Forgotpassword() {
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
        <div className='w-full max-w-2xl'>
            <VendorUserForm isForgotPasswordPage={true} />
        </div>
    </div>
  )
}

export default Forgotpassword
