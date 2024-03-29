import React from "react";
import { EmojiInputProps } from "../types";
import emojiSubstring from "../util/emoji-substring";

const EmojiInput = function ({
	input,
	value,
	setValue,
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
}: EmojiInputProps) {

	const InputField = input;

	// Main input event interactivity on Keydown
	const handleKeyDown = function (e: React.KeyboardEvent<HTMLInputElement>) {
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
	const handleKeyUp = function (e: React.KeyboardEvent<HTMLInputElement>) {
		// User-passed event
		props.onKeyUp?.(e);
		setMouseNav(false);
		const start = selStart - 1;
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
		} else if (e.key === "Backspace" && value && value[start] === ":") {
			_active = false;
		}
		const str = emojiSubstring(value, start, strict);
		_active = str.length ? true : false;
		setEmoji({ ...emoji, search: str });
		setActive(_active);
	};

	// Controlled input change
	const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
		// User-passed event
		props.onChange?.(e);
		if (e.target.selectionStart) setSelStart(e.target.selectionStart);
		setValue(e.target.value);
	};

	// User-passed event only
	const handleClick = function (e: React.MouseEvent) {
		props.onClick?.(e);
	};
	const handleFocus = function (e: React.FocusEvent) {
		props.onFocus?.(e);
	};
	const handleBlur = function (e: React.FocusEvent) {
		props.onBlur?.(e);
	};
	
	return (
		<>
			{input ? (
				<InputField
					value={value}
					onClick={handleClick}
					onChange={handleChange}
					onKeyUp={handleKeyUp}
					onKeyDown={handleKeyDown}
					onFocus={handleFocus}
					onBlur={handleBlur}
					placeholder={placeholder || ""}
					aria-label={ariaLabel || "Generic input with emoji support"}
					className="input"
				/>
			) : (
				<input
					value={value}
					onClick={handleClick}	
					onChange={handleChange}
					onKeyUp={handleKeyUp}
					onKeyDown={handleKeyDown}
					placeholder={placeholder || ""}
					aria-label={ariaLabel || "Generic input with emoji support"}
					onFocus={handleFocus}
					onBlur={handleBlur}
					className="input"
				></input>
			)}

			<style>{`
				.input,
				.wrapper > input,
				.wrapper > textarea {
					width: 100%;
					box-sizing: border-box;
					font-size: inherit;
					font-family: inherit;
				}
			`}</style>

		</>
	);

};

export default EmojiInput;