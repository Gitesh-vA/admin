"use client"

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function login(){
    const[name, setName] = useState('')
    const[password, setPassword] = useState('')
    const router = useRouter()


    const handleLogin = () => {
        if (name !== '' && password !== '') {
            let data = { name: name, password: password };
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                if(data.token){
                    localStorage.setItem('adminToken', data.token);
                    localStorage.setItem('user', name)
                    router.push('/dashboard/home')
                }
                // Handle successful login response
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle fetch error
            });
        } else {
            console.log('Invalid password');
        }
    }
    

    return(
        <div className="hold-transition login-page">
            <div className="login-box">
            <div className="login-logo">
                <a href="../../index2.html"><b>Admin</b>LTE</a>
            </div>
            <div className="card">
                <div className="card-body login-card-body">
                <p className="login-box-msg">Sign in to start your session</p>

                <div>
                    <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="User Name" onChange={(e) => setName(e.target.value)}/>
                    <div className="input-group-append">
                        <div className="input-group-text">
                        <span className="fas fa-envelope"></span>
                        </div>
                    </div>
                    </div>
                    <div className="input-group mb-3">
                    <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <div className="input-group-append">
                        <div className="input-group-text">
                        <span className="fas fa-lock"></span>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-8">
                        <div className="icheck-primary">
                        <input type="checkbox" id="remember"/>
                        <label htmlFor="remember">
                            Remember Me
                        </label>
                        </div>
                    </div>
                    <div className="col-4">
                        <button onClick={() => handleLogin()} className="btn btn-primary btn-block">Sign In</button>
                    </div>
                    </div>
                </div>

                <div className="social-auth-links text-center mb-3">
                    <p>- OR -</p>
                    <a href="#" className="btn btn-block btn-primary">
                    <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
                    </a>
                    <a href="#" className="btn btn-block btn-danger">
                    <i className="fab fa-google-plus mr-2"></i> Sign in using Google+
                    </a>
                </div>

                <p className="mb-1">
                    <a href="forgot-password.html">I forgot my password</a>
                </p>
                <p className="mb-0">
                    <Link href="/register" className='text-center'>Register a new membership</Link>
                </p>
                </div>
            </div>
            </div>
        </div>
    )
}
