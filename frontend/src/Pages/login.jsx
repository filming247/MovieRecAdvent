import "./Styles/login.css";

function Login() {
    return (
        <div className="background">
            <div className="login-container"> 
                <div className="title">
                    Welcome Back Prologuers!
                </div>
                <div className="button-container">
                    <button className="button1"> Log-In </button>
                    <button className="button2"> I'm New </button>
                </div>
            </div>;
        </div>
);
}

export default Login;