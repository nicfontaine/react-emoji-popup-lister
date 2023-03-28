import React, { useEffect, useRef } from "react";
import styles from "./../styles/EmojiPopup.module.css";
import { EmojiListProps } from "../types";

const EmojiList = function ({
	active,
	list,
	setElIndex,
	mouseNav,
	setMouseNav,
	emoji,
	maxWidth,
	maxHeight,
	footer,
}: EmojiListProps) {

	const emojiListerRef = useRef<HTMLDivElement>(null);
	const activeItem = useRef<HTMLDivElement>(null);

	// Keep emoji row item selection in view
	// Disable functionality if user is navigating with mouse
	useEffect(() => {
		if (!mouseNav && emojiListerRef?.current) {
			if (activeItem?.current) {
				activeItem.current.scrollIntoView({ behavior: "auto", block: "center" });
			}
		}
	}, [emoji.list]);
	
	// List item events
	const handleItemClick = function (e: React.MouseEvent<HTMLElement>, _emoji: string) {
		list.select(_emoji);
		// TODO: Focus back to input
	};
	const handleItemMouseEnter = function (e: React.MouseEvent, i: number) {
		setMouseNav(true);
		setElIndex(i);
		list.update();
	};
	const handleItemMouseLeave = function (e?: React.MouseEvent) {
		setMouseNav(false);
	};

	return (
		<>
			<div
				ref={emojiListerRef}
				className={styles.lister}
				style={{
					maxHeight: maxHeight,
					maxWidth: maxWidth,
				}}
			>
				{active ? (
					<>
						{ emoji.list.length ? emoji.list.map((emoji, i) => {
							return (
								<div
									aria-label={`Emoji list item: ${emoji.description}`}
									className={`${styles.item} ${emoji.active ? styles.active : ""}`}
									key={emoji.emoji}
									ref={emoji.active ? activeItem : null}
									onClick={(e) => {
										handleItemClick(e, emoji.emoji); 
									}}
									onMouseEnter={(e) => {
										handleItemMouseEnter(e, i);
									}}
									onMouseLeave={() => {
										handleItemMouseLeave();
									}}
								>
									<div className={styles.inner}>
										<div className={styles.emoji}>{emoji.emoji}</div>
										<code className={styles.code}>:{emoji.names.join(",")}</code>
									</div>
								</div>
							);
						}) : <div className={styles.itemNull}>{emoji.search.length ? "No matches found" : "type for emoji search..."}</div> }
					</>
				) : null}
			</div>
			{footer ? (
				<div className={styles.howto} aria-label="Emoji popup search total, and how-to">
					<div className={styles.left}>Total: <strong>{emoji.list.length}</strong></div>
					<div className={styles.middle}>🔼 🔽</div>
					<div className={styles.right}>⏎</div>
				</div>
			) : null}
		</>
	);
	
};

export default EmojiList;