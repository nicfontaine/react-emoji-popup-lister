import { useEffect, useState } from 'react';
import './App.css';

import EmojiPopup from './lib/index';

// Custom input (optional)
const Input = function (props) {

	useEffect(() => { /* Input value state change passed back */ }, [props.value]);

	return (
		<>
			<textarea
				// Pass props first (*required)
				{...props}
				// Override default values
				// NOTE: Do Not override these props: value, onKeyDown, onKeyUp, onChange
				// className="test-default-class"
				placeholder="Some Text"
				// Use and extend styling
				style={{ ...props.style, padding: "0.5rem" }}
			// ...
			></textarea>
		</>
	);
};

const App = function () {

	// Controlled input state (*required)
	const [inputText, setInputText] = useState("");

	useEffect(() => { /* Input value state change */ }, [inputText]);

	// Additional Event handlers for input (optional)
	const handleKeyDown = (e) => { /* Keydown from parent */ };
	const handleKeyUp = (e) => { /* Keyup from parent */ };
	const handleChange = (e) => { /* Change from parent */ };
	const handleClick = (e) => { /* Click from parent */ };
	// ...

	return (

		<div className="App">

			<h2>React Emoji Popup Lister</h2>
			<p>Type an emoji string input the input below<br></br>(&quot;:a&quot; or similar)</p>

			{/* Container to align input and popup together */}
			<div style={{ maxWidth: "400px", margin: "1rem auto 0" }}>
				<EmojiPopup
					// State (optional) - Use if you want the value, or for useEffect hooks
					inputText={inputText}
					setInputText={setInputText}
					// Additional (optional)
					input={Input}
					listMax="40"
					// maxHeight="200px"
					// maxWidth="200px"
					placeholder="Placeholder text"
					onChange={handleChange}
					onClick={handleClick}
					onKeyDown={handleKeyDown}
					onKeyUp={handleKeyUp}
				/>
			</div>

		</div>
		
	);
	
};

export default App;
