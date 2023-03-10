import { useEffect, useRef } from "react";

const EmojiList = function ({
	active,
	list,
	setElIndex,
	mouseNav,
	setMouseNav,
	emoji,
	maxWidth,
	maxHeight,
}) {

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
	}, [emoji.list]);
	
	// List item events
	const handleItemClick = function (e, _emoji) {
		list.select(_emoji);
		// TODO: Focus back to input
	};
	const handleItemMouseEnter = function (e, i) {
		setMouseNav(true);
		setElIndex(i);
		list.update();
	};
	const handleItemMouseLeave = function (e) {
		setMouseNav(false);
	};

	return (
		<>
			<div
				ref={emojiListerRef}
				className="emoji-popup-lister"
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
									className={`emoji-popup-lister-item ${emoji.active ? "active" : ""}`} key={emoji.emoji}
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
						}) : <div className="emoji-popup-lister-item-null">{emoji.search.length ? "No matches found" : "type for emoji search..."}</div> }
					</>
				) : null}
			</div>
			<div className="emoji-popup-lister-how-to" aria-label="Emoji popup search total, and how-to">
				<div className="left">Total: <strong>{emoji.list.length}</strong></div>
				<div className="middle">🔼 🔽</div>
				<div className="right">⏎</div>
			</div>
		</>
	);
	
};

export default EmojiList;