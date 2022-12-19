import {push} from "firebase/database";
import {useState} from "react";
import {Link} from "react-router-dom";

const SignUp = ({setUserID, dbSignUp, setSignUpData, signUpData, userID}) => {
	// Tracks changes in the SignUp component
	const signUpOnChange = (e) => {
		const tempVal = e.target.value;
		const currentTime = new Date().toISOString();

		setSignUpData({
			...signUpData,
			[e.target.name]: tempVal,
			signUpTime: currentTime,
		});
		console.log(signUpData);
	};

	// Handles the onSubmit function of the signUp form. Pushes the data to firebase and calculates the number of days left until the next pay.
	const signUpOnSubmit = (e) => {
		e.preventDefault();
		const pushEvent = push(dbSignUp, {signUpData: signUpData, balance: parseInt(signUpData.income)});
		setUserID(pushEvent.key);
		e.target.reset();
	};

	return (
		<section className="welcomeContainer shadowStatic">
			{userID ? (
				<>
					<p className="message">Please use your profile id to login:</p>
					<p className="message">
						<span className="userIDStyle">{userID}</span>
					</p>
					<Link className="rectangleButton shadow" to="/login">
						<p>Log In</p>
					</Link>
				</>
			) : (
				<>
					<h2>Sign Up</h2>
					<form onSubmit={signUpOnSubmit}>
						<input type="text" id="userName" name="userName" placeholder="Name" onChange={signUpOnChange} />
						<input type="number" id="income" name="income" placeholder="Income" onChange={signUpOnChange} />
						<input type="date" id="nextPay" name="nextPay" placeholder="Next Pay" onChange={signUpOnChange} />
						<button type="submit" className="rectangleButton">
							Next
						</button>
					</form>
				</>
			)}
		</section>
	);
};

export default SignUp;