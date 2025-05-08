import { useState } from "react";
import { Link, useNavigate } from "react-router"; 
import { toast } from "react-toastify";
import { userSignUp } from "../services/users";

const RegistrationForm = () => {
	const [info, setInfo] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		phoneno: "",
		address: "",
	});

	const navigate = useNavigate();

	const handleInputFieldChange = (e) =>
		setInfo({ ...info, [e.target.name]: e.target.value });

	const handleSignUpClick = async () => {
		try {
			const user = await userSignUp(
				info.email,
				info.password,
				info.firstName,
				info.lastName,
				info.phoneno,
				info.address
			);
			toast.success("User registered with id: " + user.id);
			navigate("/login");
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<div className="d-flex justify-content-center align-items-center bg-dark p-5">
			<div className="col-lg-8 col-md-7 col-sm-9 col-11 border border-5 border-warning shadow-5  m-5 p-4 rounded-3 bg-dark">
				<div className="text-center mb-4">
					<h2 className="fw-bold text-warning">Registration Form</h2>
				</div>

				<div className="m-3">
					<label className="form-label text-info fs-5 fw-bold">Email:</label>
					<input
						className="form-control text-center fw-bold fs-5"
						name="email"
						type="email"
						onChange={handleInputFieldChange}
					/>
				</div>

				<div className="m-3">
					<label className="form-label text-info fs-5 my-3 fw-bold">Password:</label>
					<input
						className="form-control text-center fw-bold fs-5"
						name="password"
						type="password"
						onChange={handleInputFieldChange}
					/>
				</div>

				<div className="m-3">
					<label className="form-label text-info fs-5 my-3 fw-bold">First Name:</label>
					<input
						className="form-control text-center fw-bold fs-5"
						name="firstName"
						type="text"
						onChange={handleInputFieldChange}
					/>
				</div>

				<div className="m-3">
					<label className="form-label text-info fs-5 my-3 fw-bold">Last Name:</label>
					<input
						className="form-control text-center fw-bold fs-5"
						name="lastName"
						type="text"
						onChange={handleInputFieldChange}
					/>
				</div>

				<div className="m-3">
					<label className="form-label text-info fs-5 my-3 fw-bold">Phone No:</label>
					<input
						className="form-control text-center fw-bold fs-5"
						name="phoneno"
						type="tel"
						onChange={handleInputFieldChange}
					/>
				</div>

				<div className="m-3">
					<label className="form-label text-info fs-5 my-3 fw-bold">Address:</label>
					<input
						className="form-control text-center fw-bold fs-5"
						name="address"
						type="text"
						onChange={handleInputFieldChange}
					/>
				</div>

				<div className="d-flex justify-content-center my-5">
					<button className="btn btn-warning fw-bold mx-3 w-50" onClick={handleSignUpClick}>
						Sign Up
					</button>
					<Link className="btn btn-secondary fw-bold mx-3 w-50" to="/signin">
						Sign In
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RegistrationForm;
