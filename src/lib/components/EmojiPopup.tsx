import styles from "./../styles/EmojiPopup.module.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Gemoji, gemoji } from "gemoji";
import FuzzySearch from "fuzzy-search";
import EmojiInput from "./EmojiInput";
import EmojiList from "./EmojiList";
const fuzzysearch = new FuzzySearch(gemoji, ["names"], { sort: true });
const themeDefault = "auto";
import { EmojiPopupProps, EmojiState, GemojiListItem } from "../types";

const EmojiPopup = ({
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
}: EmojiPopupProps) => {

	const [themeMode, setThemeMode] = useState(theme);

	const [active, setActive] = useState(false);
	const [value, setValue] = useState("");
	const [emoji, setEmoji] = useState<EmojiState>({
		list: [],
		search: "",
		select: "",
	});
	const [mouseNav, setMouseNav] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const emojiContainerRef = useRef<HTMLDivElement>(null);
	// TODO: Make sure this doesn't have any race conditions
	const [selStart, setSelStart] = useState(-1);
	const [elIndex, setElIndex] = useState(0);

	// Reset index, and add display transition class
	useEffect(() => {
		if (!active) setElIndex(0);
		if (emojiContainerRef?.current) {
			if (active) {
				emojiContainerRef.current.classList.add(styles["active"]);
			} else {
				emojiContainerRef.current.classList.remove(styles["active"]);
			}
		}
	}, [active]);

	// Theme change styling
	useEffect(() => {
		wrapperRef?.current?.classList.remove(styles["themelight"]);
		wrapperRef?.current?.classList.remove(styles["themedark"]);
		if (themeMode === "dark" || themeMode === "light") {
			wrapperRef?.current?.classList.add(styles[`theme${themeMode}`]);
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
		const inp = wrapperRef?.current?.children[0] as HTMLInputElement;
		if (inp) {
			inp.selectionStart = selStart;
			inp.selectionEnd = selStart;
			// Focus input when user clicks list item
			if (value) inp.focus();
		}
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
			if (wrapperRef?.current) {
				const delta = selStart - value.indexOf(emoji.search);
				setSelStart(selStart - delta + emoji.select.length);
				setValue(value.replace(`${emoji.search}`, emoji.select));
				setActive(false);
				setEmoji({ ...emoji, search: "", select: "" });
			}
		}
	}, [emoji.select]);

	// List display updates helpers
	useEffect(() => {
		list.update();
	}, [elIndex]);

	const list = {
		index (i: number) {
			setElIndex(i);
		},
		next () {
			list.index((elIndex + 1) % list.checkMax());
		},
		prev () {
			list.index(elIndex - 1 < 0 ? list.checkMax() - 1 : elIndex - 1);
		},
		select (override?: string) {
			if (override) {
				setEmoji({ ...emoji, select: override });
			} else if (emoji.list.length && emoji.list[elIndex]) {
				setEmoji({ ...emoji, select: emoji.list[elIndex].emoji });
			}
		},
		checkMax: () => listMax < emoji.list.length ? listMax : emoji.list.length,
		update (str?: string) {
			let list = emoji.list.slice();
			if (str && str.length) {
				str = str.replaceAll(":", "");
				const search = fuzzysearch.search(str).slice(0, listMax);
				list = search.length ? search as GemojiListItem[] : [];
			}
			if (elIndex >= list.length) setElIndex(0);
			list = list.map((s: any, i) => {
				s.active = i === elIndex ? true : false;
				return s;
			});
			setEmoji({ ...emoji, list });
		},
		
	};

	return (

		<>
			
			<div ref={wrapperRef} className={styles.wrapper}>

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
					className={styles.container}
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

		</>
		
	);  
	
};

export default EmojiPopup;