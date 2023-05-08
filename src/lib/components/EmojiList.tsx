import React, { useEffect, useRef } from "react";
import { EmojiListProps } from "../types";
import EmojiPopupHowTo from "./EmojiPopupHowTo";

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
				className="lister"
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
									className={`item ${emoji.active ? "active" : ""}`}
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
									<div className="inner">
										<div className="emoji">{emoji.emoji}</div>
										<code className="code">:{emoji.names.join(",")}</code>
									</div>
								</div>
							);
						}) : <div className="itemNull">{emoji.search.length ? "No matches found" : "type for emoji search..."}</div> }
					</>
				) : null}
			</div>

			{footer ? <EmojiPopupHowTo number={emoji?.list?.length} /> : null}

			<style>{`
				.lister {
					display: flex;
					flex-direction: column;
					overflow-y: scroll;
					min-width: 200px;
					min-height: 60px;
				}
				.item {
					cursor: pointer;
					position: relative;
				}
				.item,
				.itemNull {
					padding: 0.35rem 0.5rem 0.35rem 0.65rem;
					display: flex;
					font-size: 0.9rem;
				}
				.itemNull {
					text-align: center;
					justify-content: center;
					padding-top: 0.6rem;
				}
				.themedark .item {
					border-bottom: 1px solid rgba(38, 38, 38, 0.9);
				}
				.themelight .item {
					border-bottom: 1px solid rgba(0, 0, 0, 0.13);
				}
				.item.active {
					border-bottom: 1px solid transparent;
					z-index: 5;
				}
				.themedark .item.active {
					background: rgb(40, 40, 40);
					border-bottom: 1px solid rgb(43, 43, 43);
				}
				.themelight .item.active {
					background: rgba(0,0,0,0.07);
					border-bottom: 1px solid rgba(0, 0, 0, 0.14);
					box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.15);
					/* background: #fff; */
				}
				.themelight .item.active .emoji {
					text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
				}
				.item.active:before {
					content: "";
					position: absolute;
					left: 0;
					top: -1px;
					bottom: -1px;
					width: 4px;
				}
				.themedark .item.active:before {
					background: rgb(88, 53, 227);
				}
				.themelight .item.active:before {
					background: rgb(33, 166, 157);
				}
				.item:last-child {
					/* border-bottom: none; */
				}
				.item .inner {
					display: flex;
					min-width: 0;
					text-overflow: ellipsis;
					overflow-x: hidden;
				}
				.item .emoji {
					margin-right: 0.5rem;
					margin-left: 0.2rem;
					font-size: 1rem;
					/* width: 1.8rem; */
					display: flex;
					flex-basis: fit-content;
				}
				.item .code,
				.item .emoji {
					align-self: center;
				}
				.item .code {
					font-size: 0.86rem;
					min-width: 0;
					text-overflow: ellipsis;
					overflow-x: hidden;
				}
			`}</style>

		</>
	);
	
};

export default EmojiList;