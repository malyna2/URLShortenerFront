import "./LoginPage.styles.scss"
import userApi from "../../app/api/user.api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../app/routes/routes";
import Notification from "../../app/common/Notification/Notification.Component";

export default function LoginPage() {
    const [registered, setRegistered] = useState(true);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleClick = async () => {
        const data = {
            username: username,
            password: password
        }
        const token = registered 
        ? await userApi.login(data).catch(() => {setMessage("Invalid username or password"); setIsVisible(true)})
        : await userApi.register(data).catch(() => {setMessage("This username already exists"); setIsVisible(true)})
        if(token){
            localStorage.setItem("token", token.data);
            navigate(ROUTES.TABLE);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate(ROUTES.TABLE);
        }
    }, []);

    return (
        <div className="login-container">
            <h2>{registered ? "Log In" : "Register"}</h2>
            <div>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button onClick={handleClick} >{registered ? "Log In" : "Register"}</button>
                <p onClick={() => setRegistered(!registered)}>{registered ? "Don't have an account? Register" : "Already have an account? Log In"}</p>
            </div>
            {isVisible && <Notification message={message} type="warning" setState={setIsVisible} state={isVisible}/>}
        </div>
    );
}