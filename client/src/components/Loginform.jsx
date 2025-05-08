import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router"; 
import { toast } from "react-toastify";
import { userSignIn } from "../services/users";
import { AuthContext } from "../App";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [passwd, setPasswd] = useState("");
	const navigate = useNavigate();
	const { setUser } = useContext(AuthContext);

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const handlePasswdChange = (e) => setPasswd(e.target.value);

	const handleSignInClick = async (e) => {
		try {
			// validate user login using REST service
			const user = await userSignIn(email, passwd);
			// store user object + jwt token (in sessionStorage)
			sessionStorage.setItem("user", JSON.stringify(user));
			// update the context
			setUser(user);
			// after successful login, go to user dashboard
			navigate("/user");
		} catch (err) {
			toast.error("Invalid credentials.");
		}
	};

	return (
		<div className="d-flex justify-content-center align-items-center p-5 m-4 bg-dark">
			<div className="col-lg-8 col-md-6 col-sm-8 col-10 border border-warning border-4 shadow p-4 rounded-3 bg-dark bg-opacity-25">
				<div className="mb-3 text-warning text-center">
					<h2>Login Form</h2>
				</div>
				<div className="m-3 p-3">
					<label className="form-label fw-bold fs-5 text-info">Email:</label>
					<input
						className="form-control text-center text-black fw-bold fs-4"
						name="email"
						type="text"
						onChange={handleEmailChange}
					/>
				</div>
				<div className="m-3 p-3">
					<label className="form-label fw-bold fs-5 text-info">Password:</label>
					<input
						className="form-control text-center text-black fw-bold fs-4"
						name="passwd"
						type="password"
						onChange={handlePasswdChange}
					/>
				</div>
				<div className="d-flex justify-content-evenly p-3">
					<button
						className="btn btn-warning fw-bold mx-3 w-50"
						onClick={handleSignInClick}
					>
						Sign In
					</button>
					<Link className="btn btn-secondary fw-bold mx-3 w-50" to="/register">
						Sign Up
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
