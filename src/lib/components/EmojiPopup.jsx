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
	const [mouseNav, setMouseNav] = useState(false);
	const emojiListerRef = useRef(null);

	// Keep emoji row item selection in view
	// Disable functionality if user is navigating with mouse
	useEffect(() => {
		if (!mouseNav && emojiListerRef?.current) {
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
		select (override) {
			if (override) {
				setEmojiSelect(override);
			} else if (emojiList.length && emojiList[elIndex]) {
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
		setMouseNav(false);
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
		setMouseNav(false);
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

	// List item events
	const handleItemMouseEnter = function (e, i) {
		setMouseNav(true);
		elIndex = i;
		list.update();
	};
	const handleItemMouseLeave = function (e) {
		setMouseNav(false);
	};

	// User-passed event only
	const handleClick = function (e) {
		props.onClick?.(e);
	};
	const handleFocus = function (e) {
		props.onFocus?.(e);
	};
	const handleBlur = function (e) {
		props.onBlur?.(e);
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
						onFocus={handleFocus}
						onBlur={handleBlur}
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
						onFocus={handleFocus}
						onBlur={handleBlur}
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
							{ emojiList.length ? emojiList.map((emoji, i) => {
								return (
									<div
										className={`emoji-popup-lister-item ${emoji.active ? "active" : ""}`} key={emoji.emoji}
										onClick={() => {
											list.select(emoji.emoji); 
										}}
										onMouseEnter={(e) => {
											handleItemMouseEnter(e, i);
										}}
										onMouseLeave={() => {
											handleItemMouseLeave();
										}}
									>
										<div className="inner">
											<div className="emoji">{emoji.emoji}</div>
											<code className="code">:{emoji.names.join(",")}</code>
										</div>
									</div>
								);
							}) : <div className="emoji-popup-lister-item-null">{emojiSearchString.length ? "No matches found" : "type for emoji search..."}</div> }
						</div>
						<div className="emoji-popup-lister-how-to">
							<div className="left">Total: <strong>{emojiList.length}</strong></div>
							<div className="right">Navigate: <code>Up/Down</code>, Select: <code>Enter</code></div>
						</div>
					</div>
				) : null}
				
			</div>

		</>
		
	);  
	
};

export default EmojiPopup;