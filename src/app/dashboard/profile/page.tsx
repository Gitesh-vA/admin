"use client"

import { useState } from "react"

export default function profile() {
    const [email, setEmail] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = () => {
        if(newPassword == '' && confirmPassword == '') {
            alert('Enter New password')
            return
        }
        if(newPassword != confirmPassword){
            alert('New password and Confim password do not match!')
            return
        }
        const data = {
            email: email,
            password: currentPassword,
            retypePassword: newPassword
        }
        fetch('/api/reset', {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

    return (
        <div className="card card-primary">
            <div className="card-header">
                <h3 className="card-title">Change Password</h3>
            </div>
            <form>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Current Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Current Password" onChange={(e) => setCurrentPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">New Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Re-type New Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Retype New Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                </div>

                <div className="card-footer">
                    <button onClick={() => handleSubmit()} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}