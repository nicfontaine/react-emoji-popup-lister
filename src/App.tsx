import React, { useEffect, useState } from "react";
import "./App.css";

// import EmojiPopup from "./lib/index";
import EmojiPopup from "react-emoji-popup-lister";

// Custom input (optional)
const Input = function (props: any) {

	useEffect(() => { /* Input value state change passed back */ }, [props.value]);

	return (
		<>
			<textarea
				// Pass props first (*required)
				{...props}
				// Override default values
				// NOTE: Do Not override these props: value, onKeyDown, onKeyUp, onChange
				placeholder="Use &quot;:&quot; to type an emoji"
				style={{ ...props.style, padding: "0.7rem", minHeight: "80px" }}
				aria-label="Profile description"
				autoFocus={true}
			></textarea>
		</>
	);
};

const App = function () {

	const [val, setVal] = useState("");
	useEffect(() => { /* Input value state change */ }, [val]);

	// Additional Event handlers for input (optional)
	const handleKeyDown = (e: React.KeyboardEvent) => { /* Keydown from parent */ };
	const handleKeyUp = (e: React.KeyboardEvent) => { /* Keyup from parent */ };
	const handleChange = (e: React.ChangeEvent) => { /* Change from parent */ };
	const handleClick = (e: React.MouseEvent) => { /* Click from parent */ };
	// ...

	return (

		<div className="App">

			<h1>Emoji Popup Lister</h1>

			{/* Container to align input and popup together */}
			<div style={{ maxWidth: "400px", margin: "1rem auto 0" }}>
				<EmojiPopup
					// State (optional) - Use if you want the value, or for useEffect hooks
					value={val}
					setValue={setVal}
					// Additional (optional)
					input={Input}
					listMax={20}
					maxHeight={170}
					maxWidth={350}
					theme="dark"
					// footer={false}
					strict={true}
					onChange={handleChange}
					onClick={handleClick}
					onKeyDown={handleKeyDown}
					onKeyUp={handleKeyUp}
				>
					{/* <div className="">I am a child</div> */}
				</EmojiPopup>
			</div>

			<h2>⌨️ 🥰</h2>

			<p><a href="https://github.com/nicfontaine/react-emoji-popup-lister" target="_blank" rel="noreferrer">Github</a></p>

		</div>
		
	);
	
};

export default App;
