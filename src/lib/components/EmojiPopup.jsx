import "./../style/emoji-popup.css";
import { useState, useEffect, useRef } from "react";
import { gemoji } from "gemoji";
import FuzzySearch from "fuzzy-search";
import emojiSubstring from "../util/emoji-substring";
const fuzzysearch = new FuzzySearch(gemoji, ["names"], { sort: true });
var elIndex = 0;

const EmojiPopup = ({
	input,
	inputText: userPropInputText,
	setInputText: setUserPropInputText,
	listMax = 6,
	maxWidth = "400px",
	maxHeight = "250px",
	placeholder,
	...props
}) => {

	const InputField = input;
	const [active, setActive] = useState(false);
	const [inputText, setInputText] = useState("");
	const [emojiList, setEmojiList] = useState([]);
	const [emojiSearchString, setEmojiSearchString] = useState("");
	const [emojiSelect, setEmojiSelect] = useState("");
	const emojiListerRef = useRef(null);

	// Keep emoji row item selection in view
	useEffect(() => {
		if (emojiListerRef?.current) {
			const liActive = emojiListerRef.current.getElementsByClassName("active")[0];
			if (liActive) {
				liActive.scrollIntoView({ behavior: "auto", block: "center" });
			}
		}
	}, [emojiList]);

	// Sync user prop state with internal state
	useEffect(() => {
		setUserPropInputText?.(inputText);
	}, [inputText]);

	// Display fuzzy-matched emojis
	useEffect(() => {
		list.update(emojiSearchString);
	}, [emojiSearchString]);

	// Replace emoji string match with emoji, and reset states
	useEffect(() => {
		if (emojiSelect) {
			setInputText(inputText.replace(`${emojiSearchString}`, emojiSelect));
			setActive(false);
			setEmojiSearchString("");
			setEmojiSelect("");
		}
	}, [emojiSelect]);

	// List display updates helpers
	const list = {
		next () {
			elIndex = (elIndex + 1) % list.checkMax();
			list.update();
		},
		prev () {
			elIndex = elIndex - 1 < 0 ? list.checkMax() - 1 : elIndex - 1;
			list.update();
		},
		select () {
			if (emojiList.length && emojiList[elIndex]) {
				setEmojiSelect(emojiList[elIndex].emoji);
			}
		},
		checkMax: () => listMax < emojiList.length ? listMax : emojiList.length,
		update (str) {
			let list = emojiList.slice();
			if (str && str.length) {
				str = str.replaceAll(":", "");
				const search = fuzzysearch.search(str).slice(0, listMax);
				list = search.length ? search : [];
			}
			if (elIndex >= list.length) elIndex = 0;
			list = list.map((s, i) => {
				s.active = i === elIndex ? true : false;
				return s;
			});
			setEmojiList(list);
		},
		
	};

	// Main input event interactivity on Keydown
	const handleKeyDown = function (e) {
		// User-passed event
		props.onKeyDown?.(e);
		if (!active) return;
		
		const prevent = ["Enter", "ArrowDown", "ArrowUp", "Tab"];
		if (prevent.indexOf(e.key) > -1) {
			e.preventDefault();
		}

		if (e.key === "ArrowUp") {
			list.prev();
		} else if (e.key === "ArrowDown") {
			list.next();
		} else if (e.key === "Enter" || e.key === "Tab") {
			list.select();
		} else if (e.key === "Escape") {
			// NOTE: This is overridden by keyup check. So would need to set a bypass, and determine a reset case
			// setActive(false)
		}
	};

	// Determine emoji search and visibility on Keyup
	const handleKeyUp = function (e) {
		// User-passed event
		props.onKeyUp?.(e);
		const start = e.target.selectionStart - 1;
		var _active = active;
		// Possible state change cases
		if (e.key === ":") {
			_active = true;
		} else if (e.key === " ") {
			_active = false;
		} else if (e.key === "Backspace" && inputText[start] === ":") {
			_active = false;
		}
		const str = emojiSubstring(inputText, start);
		_active =  str.length ? true : false;
		setEmojiSearchString(str);
		setActive(_active);
	};

	// Controlled input change
	const handleChange = function (e) {
		// User-passed event
		props.onChange?.(e);
		setInputText(e.target.value);
	};

	// User-passed event only
	const handleClick = function (e) {
		props.onClick?.(e);
	};

	return (

		<>
			
			<div className="emoji-popup-lister-wrapper">

				{input ? (
					<InputField
						value={inputText}
						onClick={handleClick}
						onChange={handleChange}
						onKeyUp={handleKeyUp}
						onKeyDown={handleKeyDown}
						className="emoji-popup-lister-input"
					/>
				) : (
					<input
						value={inputText}
						onClick={handleClick}	
						onChange={handleChange}
						onKeyUp={handleKeyUp}
						onKeyDown={handleKeyDown}
						placeholder={placeholder}
						className="emoji-popup-lister-input"
					></input>
				)}
				
				{ active ? (
					<div className="emoji-popup-lister-container">
						<div
							ref={emojiListerRef}
							className="emoji-popup-lister"
							style={{
								maxHeight: maxHeight,
								maxWidth: maxWidth,
							}}
						>
							{ emojiList.length ? emojiList.map((emoji) => {
								return (
									<div className={`emoji-popup-lister-item ${emoji.active ? "active" : ""}`} key={emoji.emoji}>
										<div className="inner">
											<div className="emoji">{emoji.emoji}</div>
											<code className="code">:{emoji.names.join(",")}</code>
										</div>
									</div>
								);
							}) : <div className="emoji-popup-lister-item-null">{emojiSearchString.length ? "No matches found" : "type for emoji search..."}</div> }
						</div>
						<div className="emoji-popup-lister-how-to">Navigate: <code>Up/Down</code>, Select: <code>Enter</code></div>
					</div>
				) : null}
				
			</div>

		</>
		
	);  
	
};

export default EmojiPopup;