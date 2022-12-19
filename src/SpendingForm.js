import {push, set} from "firebase/database";
import {useState} from "react";

const SpendingForm = ({dbSpending, daysSince, userBalance, setUserBalance, dbBalance, daysUntil}) => {
	// Form input onChange for the spending data will be stored in this state
	const [newSpendingData, setNewSpendingData] = useState({});
	// Tracks changes in the SpendingForm
	const spendingOnChange = (e) => {
		// Store the changes inside a variable
		const tempVal = e.target.value;
		setNewSpendingData({
			// Spreading whatever existing data is in newSpendingData
			...newSpendingData,
			// Target the name attribute and use that as the property and pair it with the tempVal. Overwrites an existing value if the name matches to 'update' the value
			[e.target.name]: tempVal,
		});
		console.log(newSpendingData);
	};

	// Handles the submission behavior of the SpendingForm
	const spendingOnSubmit = (e) => {
		e.preventDefault();

		const tempCalc = userBalance - newSpendingData.expenseCost;
		setUserBalance(tempCalc);
		console.log(tempCalc);
		set(dbBalance, tempCalc);
		push(dbSpending, {[newSpendingData.expenseName]: parseInt(newSpendingData.expenseCost)});
		e.target.reset();

		// Calc the live balance
	};

	return (
		<>
			<form onSubmit={spendingOnSubmit} className="spendingFormContainer">
				<h2 className="dayCount">Day: {daysSince}</h2>
				<h2 className="dayCount">Days until next pay: {daysUntil}</h2>
				<input type="text" id="expenseName" name="expenseName" placeholder="Expense Name" onChange={spendingOnChange} />
				<input type="number" id="expenseCost" name="expenseCost" placeholder="Expense Cost" onChange={spendingOnChange} />
				<button type="submit" className="rectangleButton">
					Submit Expense
				</button>
			</form>
		</>
	);
};

export default SpendingForm;