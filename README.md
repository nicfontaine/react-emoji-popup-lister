# React Emoji Popup Lister
> Slack-lick emoji list and select via keyboard

## About
Type and insert emojis within your inputs, via their shortcode values (`:cool:`)

## Install
`npm i -s emoji-popup-lister`

## Usage
```javascript
import EmojiPopup from "emoji-popup-lister"

// 1. Basic
export default function ExampleA () {
	return <EmojiPopup />
}

// 2. Custom styling with props
export default function ExampleB () {
	return (
		<EmojiPopup
			listMax="40"
			maxHeight="200px"
			maxWidth="300px"
			placeholder="Your placeholder text"
		/>
	);
}

// 3. Provide an input component, state, and events from your parent component
function Input (props) {
	return (
		<input
			// Required. Anything after is optional, and will override values
			{...props}
			// Override existing input styles
			className="your-class-name"
			placeholder="Your placeholder text"
			// Use and extend styling inline
			style={{ ...props.style, padding: "0.5rem" }}
			//...
		></input>
	);
}
export default function ExampleB () {
	// Input state
	const [inputText, setInputText] = useState("");
	// Example event
	const handleChange = function (e) {
		console.log(e);
	};
	return (
		{/* Container to align input and popup together */}
		<div style={{ maxWidth: "400px", margin: "1rem auto 0"}}>
			<EmojiPopup
				// Use your input component
				input={Input}
				// Pass state from the parent component
				inputText={inputText}
				setInputText={setInputText}
				// Add your event handlers
				onChange={handleChange}
				//...
			/>
		</div>
	);
}

```

## Prop Options
> All are optional

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `input` | HTML input or textarea | `<input>` | Pass your own input element or component |
| `inputText` | useState `string` value | `""` | Store state in your parent component |
| `setInputText` | useState `function` | setState | Set `inputText` from inside Emoji component |
| `listMax` | `number` | `6` | Max number of emoji matches to display |
| `maxWidth` | `number` | `400px` | Scroll container width cap |
| `maxHeight` | `number` | `250px` | Scroll container height cap |
| `placeholder` | `string` | `""` | Input placeholder value |

## Prop Events
> Place on `<EmojiPopup>` component, **Not** your custom `input` prop as this will override necessary events

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onClick` | `function` | - | Input element click event (* Not emoji list) |
| `onChange` | `function` | - | Input value change event |
| `onKeyUp` | `function` | - | Input keyUp event |
| `onKeyDown` | `function` | - | Input keyDown event |

## Styling

#### Input
Input contains the className `emoji-popup-lister-input`. This can also be overridden by passing your own input component with a `className` prop after the required `{...props}`

#### Popup
Currently there are no theming options. But most elements will follow the format `emoji-popup-lister-*` if you want to add your own custom CSS. The "Prop Options" section above contains a few basic display settings as well.

## License
MIT © [nicfontaine](https://github.com/nicfontaine)
