import { useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import './Login.css'
import axios from 'axios'
import { useContext } from "react";
import { StoreContext } from '../../context/StoreContext'
import { toast } from 'react-toastify';


export default function Login({ setShowLogin  }) {
    const { url, setToken } = useContext(StoreContext)

    const [currentState, setCurrentState] = useState("Sign Up");
    const [loginData, setLoginData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleLoginUser = (e) => {
        setLoginData((curData) => ({ ...curData, [e.target.name]: e.target.value }))
    }


    const handleSubmit = async (e) => {
        let newURL = url
        e.preventDefault();

        if (currentState == "Sign Up") {
            newURL += "/api/user/signup"
        }
        else {
            newURL += "/api/user/login"
        }

        const response = await axios.post(newURL, loginData);
        if (response.data.success) {
            let redirect = localStorage.getItem("redirectAfterLogin");
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
            toast.success(response.data.message);
            if (redirect) {
                localStorage.removeItem("redirectAfterLogin")
                window.location.href = redirect
            }
        }
        else {
            toast.error(response.data.message);
        }
    }

    return (
        <div className="login">

            <div className="login-container">
                <div className="login-heading">
                    <h1>{currentState}</h1>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="cross" />
                </div>

                <div className="login-details">
                    <form onSubmit={handleSubmit}>
                        {currentState === "Sign Up" ? <div className="name"><input type="text" name="name" placeholder="enter name" onChange={handleLoginUser} value={loginData.name} required /></div> : <></>}
                        <div className="email">
                            <input type="mail" placeholder="enter mail" name="email" onChange={handleLoginUser} value={loginData.email} required />
                        </div>
                        <div className="password">
                            <input type="password" placeholder="enter password" name="password" onChange={handleLoginUser} value={loginData.password} required />
                        </div>

                        <button>{currentState}</button>
                    </form>

                </div>
                {currentState === "Sign Up" ? <p>Already have an account? <span onClick={() => setCurrentState("Login")} className="span">click here</span></p> : <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")} className="span">click here</span></p>}

        
            </div>
        </div >
    )
}
