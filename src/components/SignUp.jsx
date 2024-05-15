import React, { Component } from 'react';
import './main.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class SignUp extends Component {
    handleClick = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        const body = {
            username,
            email,
            password
        }

        const url = BACKEND_URL + '/api/signup'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }

        if (password !== confirmPassword) {
            //THROW AN ERROR MESSAGE
            console.log("Passwords do not match")
            return
        }

        const request = await fetch(url, options);
        console.log(`request: ${request}`);
        const data = await request.json();
        console.log(`data: ${data}`);
    };

    render() {
        return (
            <div>
                <h1 className="text-center">Sign Up</h1>
                <form className="col-3 mx-auto" onSubmit={this.handleClick}>
                    <input className="form-control" type="text" name="username" placeholder="Userame" />
                    <input className="form-control" type="text" name="email" placeholder="Email" />
                    <input className="form-control" type="new-password" name="password" placeholder="Password" />
                    <input className="form-control" type="new-password" name="confirmPassword" placeholder="Confirm Password" />
                    <button className="btn btn-success mx-auto">Submit</button>
                </form>
            </div>
        );
    }
}



export default SignUp;