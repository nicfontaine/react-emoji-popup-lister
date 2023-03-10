import "./../style/emoji-popup.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { gemoji } from "gemoji";
import FuzzySearch from "fuzzy-search";
import EmojiInput from "./EmojiInput";
import EmojiList from "./EmojiList";
const fuzzysearch = new FuzzySearch(gemoji, ["names"], { sort: true });
const themeDefault = "auto";

const EmojiPopup = ({
	input,
	inputText: userPropInputText,
	setInputText: setUserPropInputText,
	listMax = 6,
	maxWidth = "400px",
	maxHeight = "250px",
	placeholder,
	theme = themeDefault,
	...props
}) => {

	const [themeMode, setThemeMode] = useState(theme);

	const [active, setActive] = useState(false);
	const [inputText, setInputText] = useState("");
	const [emojiList, setEmojiList] = useState([]);
	const [emojiSearchString, setEmojiSearchString] = useState("");
	const [emojiSelect, setEmojiSelect] = useState("");
	const [mouseNav, setMouseNav] = useState(false);
	const wrapperRef = useRef(null);
	const emojiContainerRef = useRef(null);
	// TODO: Make sure this doesn't have any race conditions
	const [selStart, setSelStart] = useState(-1);
	// TODO: Replace global index w/ state
	const [elIndex, setElIndex] = useState(0);

	// Reset index, and add display transition class
	useEffect(() => {
		if (active) {
			emojiContainerRef.current.classList.add("active");
		} else {
			setElIndex(0);
			// elIndex = 0;
			emojiContainerRef.current.classList.remove("active");
		}
	}, [active]);

	// Theme change styling
	useEffect(() => {
		wrapperRef.current.classList.remove("theme-light");
		wrapperRef.current.classList.remove("theme-dark");
		if (themeMode === "dark" || themeMode === "light") {
			wrapperRef.current.classList.add(`theme-${themeMode}`);
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
		setUserPropInputText?.(inputText);
		const inp = wrapperRef.current.children[0];
		inp.selectionStart = selStart;
		inp.selectionEnd = selStart;
	}, [inputText]);

	// Display fuzzy-matched emojis
	useEffect(() => {
		list.update(emojiSearchString);
	}, [emojiSearchString]);

	// Replace emoji string match with emoji, and reset states
	useEffect(() => {
		if (emojiSelect) {
			const inp = wrapperRef.current.children[0];
			// Calculate selection start, to fix going to the end of input
			const delta = inp.selectionStart - inputText.indexOf(emojiSearchString);
			// selStart = inp.selectionStart - delta + emojiSelect.length;
			setSelStart(inp.selectionStart - delta + emojiSelect.length);
			setInputText(inputText.replace(`${emojiSearchString}`, emojiSelect));
			// console.log([...emojiSelect]);
			setActive(false);
			setEmojiSearchString("");
			setEmojiSelect("");
		}
	}, [emojiSelect]);

	// List display updates helpers
	useEffect(() => {
		list.update();
	}, [elIndex]);

	const list = {
		next () {
			setElIndex((elIndex + 1) % list.checkMax());
		},
		prev () {
			setElIndex(elIndex - 1 < 0 ? list.checkMax() - 1 : elIndex - 1);
		},
		index (i) {
			setElIndex(i);
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
			if (elIndex >= list.length) setElIndex(0);
			list = list.map((s, i) => {
				s.active = i === elIndex ? true : false;
				return s;
			});
			setEmojiList(list);
		},
		
	};

	return (

		<>
			
			<div ref={wrapperRef} className="emoji-popup-lister-wrapper">

				<EmojiInput
					input={input}
					inputText={inputText}
					setInputText={setInputText}
					active={active}
					setActive={setActive}
					list={list}
					setEmojiSearchString={setEmojiSearchString}
					emojiList={emojiList}
					selStart={selStart}
					setSelStart={setSelStart}
					setMouseNav={setMouseNav}
					{...props}
				></EmojiInput>
				
				<div
					className="emoji-popup-lister-container"
					aria-label={active ? "Emoji lister popup" : ""}
					ref={emojiContainerRef}
				>
					<EmojiList
						active={active}
						list={list}
						elIndex={elIndex}
						setElIndex={setElIndex}
						mouseNav={mouseNav}
						setMouseNav={setMouseNav}
						emojiList={emojiList}
						emojiSearchString={emojiSearchString}
						{...props}
					></EmojiList>
				
				</div>

				{ props.children ? { ...props.children } : null }
				
			</div>

		</>
		
	);  
	
};

export default EmojiPopup;