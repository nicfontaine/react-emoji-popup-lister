const EmojiPopupHowTo = ({ number }) => {
	return (
		<>
			<div className="howto" aria-label="Emoji popup search total, and how-to">
				<div className="left">Total: <strong>{number}</strong></div>
				<div className="middle">🔼 🔽</div>
				<div className="right">⏎</div>
			</div>
			
			<style>{`
				.howto {
					padding: 0.6rem 0.5rem;
					font-size: 0.75rem;
					display: flex;
					flex-wrap: wrap;
					/* justify-content: space-between; */
					box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
					z-index: 10;
					position: relative;
					/* background: rgba(255,255,255,0.18); */
				}
				.themedark .howto {
					background: rgba(28,28,28,1);
					color: rgba(255,255,255,0.7);
				}
				.themelight .howto {
					/* background: rgba(210,210,210,1); */
					color: rgba(0, 0, 0, 0.7);
				}
				.howto .left {
					margin-right: 0.5rem;
				}
				.howto .middle {
					margin-left: auto;
				}
				.howto .right {
					margin-left: 0.5rem;
					font-style: italic;
				}
				.howto code {
					padding: 0.1rem 0.3rem;
					border-radius: 4px;
					line-height: 1.2;
				}
				.themedark .howto code {
					color: rgba(255,255,255,0.9);
					background: rgba(255, 255, 255, 0.2);
				}
				.themelight .howto code {
					color: rgba(0, 0, 0, 0.9);
					background: rgba(0, 0, 0, 0.2);
				}
			`}</style>
			
		</>

	);
};

export default EmojiPopupHowTo;