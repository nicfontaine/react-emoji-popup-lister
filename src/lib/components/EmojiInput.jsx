import emojiSubstring from "../util/emoji-substring";
import styles from "./../styles/EmojiPopup.module.css";

const EmojiInput = function ({
	input,
	inputText,
	setInputText,
	active,
	setActive,
	list,
	emoji,
	setEmoji,
	selStart,
	setSelStart,
	setMouseNav,
	placeholder,
	ariaLabel,
	strict,
	...props
}) {

	const InputField = input;

	// Main input event interactivity on Keydown
	const handleKeyDown = function (e) {
		// User-passed event
		props.onKeyDown?.(e);
		setMouseNav(false);
		if (!active) return;
		
		const prevent = ["Enter", "ArrowDown", "ArrowUp", "Tab", "Home", "End"];
		if (prevent.indexOf(e.key) > -1) e.preventDefault();

		if (e.key === "ArrowUp") {
			list.prev();
		} else if (e.key === "ArrowDown") {
			list.next();
		} else if (e.key === "Enter" || e.key === "Tab") {
			list.select();
		} else if (e.key === "Home") {
			list.index(0);
		} else if (e.key === "End") {
			list.index(emoji.list.length - 1);
		} else if (e.key === "Escape") {
			setEmoji({ ...emoji, search: "" });
			setActive(false);
		}
	};

	// Determine emoji search and visibility on Keyup
	const handleKeyUp = function (e) {
		// User-passed event
		props.onKeyUp?.(e);
		setMouseNav(false);
		const start = e.target.selectionStart - 1;
		var _active = active;
		if (e.key === "Escape") {
			setEmoji({ ...emoji, search: "" });
			setActive(false);
			return;
		}
		// Possible state change cases
		if (e.key === ":") {
			_active = true;
		} else if (e.key === " ") {
			_active = false;
		} else if (e.key === "Backspace" && inputText[start] === ":") {
			_active = false;
		}
		const str = emojiSubstring(inputText, start, strict);
		_active = str.length ? true : false;
		setEmoji({ ...emoji, search: str });
		setActive(_active);
	};

	// Controlled input change
	const handleChange = function (e) {
		// User-passed event
		props.onChange?.(e);
		// selStart = e.target.selectionStart;
		setSelStart(e.target.selectionStart);
		setInputText(e.target.value);
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
			{input ? (
				<InputField
					value={inputText}
					onClick={handleClick}
					onChange={handleChange}
					onKeyUp={handleKeyUp}
					onKeyDown={handleKeyDown}
					onFocus={handleFocus}
					onBlur={handleBlur}
					placeholder={placeholder || ""}
					aria-label={ariaLabel || "Generic input with emoji support"}
					className={styles.input}
					id="input-field"
				/>
			) : (
				<input
					value={inputText}
					onClick={handleClick}	
					onChange={handleChange}
					onKeyUp={handleKeyUp}
					onKeyDown={handleKeyDown}
					placeholder={placeholder || ""}
					aria-label={ariaLabel || "Generic input with emoji support"}
					onFocus={handleFocus}
					onBlur={handleBlur}
					className={styles.input}
					id="input-field"
				></input>
			)}
		</>
	);

};

export default EmojiInput;