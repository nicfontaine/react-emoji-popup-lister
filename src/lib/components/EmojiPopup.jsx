import React from "react";
import { useState, useEffect, useRef } from "react";
import { gemoji } from "gemoji";
import FuzzySearch from "fuzzy-search";
import EmojiInput from "./EmojiInput";
import EmojiList from "./EmojiList";
const fuzzysearch = new FuzzySearch(gemoji, ["names"], { sort: true });
const themeDefault = "auto";

const EmojiPopupInput = ({
	input,
	value: userPropInputText,
	setValue: setUserPropInputText,
	theme = themeDefault,
	strict = true,
	listMax = 6,
	maxWidth = "400px",
	maxHeight = "250px",
	footer = true,
	placeholder,
	ariaLabel,
	...props
}) => {

	const [themeMode, setThemeMode] = useState(theme);

	const [active, setActive] = useState(false);
	const [value, setValue] = useState("");
	const [emoji, setEmoji] = useState({
		list: [],
		search: "",
		select: "",
	});
	const [mouseNav, setMouseNav] = useState(false);
	const wrapperRef = useRef(null);
	const emojiContainerRef = useRef(null);
	// TODO: Make sure this doesn't have any race conditions
	const [selStart, setSelStart] = useState(-1);
	const [elIndex, setElIndex] = useState(0);

	// Reset index, and add display transition class
	useEffect(() => {
		if (active) {
			emojiContainerRef.current.classList.add("active");
		} else {
			setElIndex(0);
			emojiContainerRef.current.classList.remove("active");
		}
	}, [active]);

	// Theme change styling
	useEffect(() => {
		wrapperRef.current.classList.remove("themelight");
		wrapperRef.current.classList.remove("themedark");
		if (themeMode === "dark" || themeMode === "light") {
			wrapperRef.current.classList.add(`theme${themeMode}`);
		}
	}, [themeMode]);

	// Theme change events and state
	useEffect(() => {
		if (theme === "auto") {
			window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => setThemeMode(e.matches ? "dark" : "light"));
			setThemeMode(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
		} else {
			setThemeMode(theme);
			window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", () => {
			});
		}
	}, [theme]);

	// Sync user prop state with internal state
	useEffect(() => {
		setUserPropInputText?.(value);
		const inp = wrapperRef.current.children[0];
		inp.selectionStart = selStart;
		inp.selectionEnd = selStart;
		// Focus input when user clicks list item
		if (value) inp.focus();
	}, [value]);

	// Display fuzzy-matched emojis
	useEffect(() => {
		list.update(emoji.search);
	}, [emoji.search]);

	// Replace emoji string match with emoji, and reset states
	useEffect(() => {
		if (emoji.select) {
			// console.log([...emoji.select]);
			// Calculate selection start, to fix going to the end of input
			const inp = wrapperRef.current.children[0];
			const delta = inp.selectionStart - value.indexOf(emoji.search);
			setSelStart(inp.selectionStart - delta + emoji.select.length);
			setValue(value.replace(`${emoji.search}`, emoji.select));
			setActive(false);
			setEmoji({ ...emoji, string: "", select: "" });
		}
	}, [emoji.select]);

	// List display updates helpers
	useEffect(() => {
		list.update();
	}, [elIndex]);

	const list = {
		index (i) {
			setElIndex(i);
		},
		next () {
			list.index((elIndex + 1) % list.checkMax());
		},
		prev () {
			list.index(elIndex - 1 < 0 ? list.checkMax() - 1 : elIndex - 1);
		},
		select (override) {
			if (override) {
				setEmoji({ ...emoji, select: override });
			} else if (emoji.list.length && emoji.list[elIndex]) {
				setEmoji({ ...emoji, select: emoji.list[elIndex].emoji });
			}
		},
		checkMax: () => listMax < emoji.list.length ? listMax : emoji.list.length,
		update (str) {
			let list = emoji.list.slice();
			if (str && str.length) {
				str = str.replaceAll(":", "");
				const search = fuzzysearch.search(str).slice(0, listMax);
				list = search.length ? search : [];
			}
			if (elIndex >= list.length) setElIndex(0);
			list = list.map((s, i) => {
				s.active = i === elIndex ? true : false;
				return s;
			});
			setEmoji({ ...emoji, list });
		},
		
	};

	return (

		<>
			
			<div ref={wrapperRef} className="wrapper">

				<EmojiInput
					input={input}
					value={value}
					setValue={setValue}
					active={active}
					setActive={setActive}
					list={list}
					emoji={emoji}
					setEmoji={setEmoji}
					selStart={selStart}
					setSelStart={setSelStart}
					setMouseNav={setMouseNav}
					placeholder={placeholder}
					ariaLabel={ariaLabel}
					strict={strict}
					{...props}
				></EmojiInput>
				
				<div
					className="container"
					aria-label={active ? "Emoji lister popup" : ""}
					ref={emojiContainerRef}
				>
					<EmojiList
						active={active}
						list={list}
						setElIndex={setElIndex}
						mouseNav={mouseNav}
						setMouseNav={setMouseNav}
						emoji={emoji}
						maxWidth={maxWidth}
						maxHeight={maxHeight}
						footer={footer}
					></EmojiList>
				
				</div>

				{ props.children ? { ...props.children } : null }
				
			</div>

			<style>{`
				.wrapper {
					position: relative;
				}
				.themedark.wrapper {
					color: #ddd;
				}
				.themelight.wrapper {
					color: #222;
				}
				.input,
				.wrapper > input,
				.wrapper > textarea {
					width: 100%;
					box-sizing: border-box;
					font-size: inherit;
					font-family: inherit;
				}
				.container {
					position: absolute;
					z-index: 20;
					bottom: -7px;
					border-radius: 8px;
					overflow: hidden;
					transition: all 0.1s;
					opacity: 0;
					transform: translateY(96%);
				}
				.container.active {
					opacity: 1;
					transform: translateY(100%);
				}
				.themedark .container {
					background: rgba(0,0,0,0.9);
					box-shadow: 0 4px 18px rgba(0,0,0,0.6);
					/* border: 2px solid rgba(255,255,255,0.14); */
				}
				.themelight .container {
					background: rgba(255, 255, 255, 1);
					box-shadow: 0 4px 18px rgba(0,0,0,0.3);
					/* border: 2px solid rgba(0, 0, 0, 0.14); */
				}
			`}</style>

		</>
		
	);  
	
};

export default EmojiPopupInput;