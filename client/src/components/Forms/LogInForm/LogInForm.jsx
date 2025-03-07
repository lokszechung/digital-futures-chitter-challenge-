import { useState } from "react";

import { isAuthenticated, setToken } from "../../../utils/auth.js";

import { logIn } from "../../../utils/services.js";

import "./LogInForm.css";

const LogInForm = ({ handleCloseModal, setAuthenticated }) => {
	const [formFields, setFormFields] = useState({
		usernameOrEmail: "",
		password: "",
	});
	const [error, setError] = useState("");

	const handleInputChange = (e) => {
		setError("");
		setFormFields({ ...formFields, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await logIn(formFields);
			setToken(response.token);
			handleCloseModal();
			setTimeout(() => {
				setAuthenticated(isAuthenticated());
			}, 300);
		} catch (error) {
			setError(error.response.data.message);
		}
	};

	return (
		<form className="login-form" onSubmit={handleSubmit}>
			<div className="form-floating mb-3 w-100">
				<input
					type="text"
					className="form-control"
					name="usernameOrEmail"
					id="floatingInput"
					placeholder="Email or username"
					required
					onChange={handleInputChange}
				/>
				<label htmlFor="floatingInput">Email or username</label>
			</div>
			<div className="form-floating w-100">
				<input
					type="password"
					className="form-control"
					name="password"
					id="floatingPassword"
					placeholder="Password"
					required
					onChange={handleInputChange}
					data-testid="log-in-password"
				/>
				<label htmlFor="floatingPassword">Password</label>
			</div>
			{error && <p className="text-danger mt-3 mb-0">{error}</p>}
			<button type="submit" className="login mt-3" data-testid="log-in-submit">
				Log In
			</button>
		</form>
	);
};

export default LogInForm;
