# React Emoji Popup Lister
> Slack-lick emoji list and select via keyboard

## About
Type and insert emojis within your inputs, via their shortcode values (`:cool:`)

## Install
`npm i -s emoji-popup-lister`

## Usage

### 1. Basic
```javascript
import EmojiPopup from "emoji-popup-lister"

export default function ExampleA () {
  return <EmojiPopup />
}
```

### 2. Custom styling with props
```javascript
import EmojiPopup from "emoji-popup-lister"

export default function ExampleB () {
  return (
    <EmojiPopup
      listMax="40"
      maxHeight="200px"
      maxWidth="300px"
      placeholder="Your placeholder text"
      theme="light"
      // ...
    />
  );
}
```

### 3. Provide an input component, state, and events from your parent component
Also wrap in a container div, to align the input and popup   

```javascript
import { useState, useEffect } from "react";
import EmojiPopup from "emoji-popup-lister"

function Input (props) {
  // State update in child component
  useEffect(() => { }, [props.value]);
  return (
    <input
      // Required. Anything after is optional, and will override values
      {...props}
      // Override existing input styles
      className="your-class-name"
      placeholder="Your placeholder text"
      // Use and extend styling inline
      style={{ ...props.style, padding: "0.5rem" }}
      // ...
    ></input>
  );
}

export default function ExampleC () {
  // Input state
  const [inputText, setInputText] = useState("");
  // State update in parent component
  useEffect(() => { }, [inputText]);
  // Example event
  const handleChange = function (e) { };
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
        // ...
      >
        <div>Child content...</div>
      </EmojiPopup>
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
| `theme` | `light` `dark` `auto`  | `dark` | Popup display theme style |
| `maxWidth` | `number` | `400px` | Scroll container width cap |
| `maxHeight` | `number` | `250px` | Scroll container height cap |
| `placeholder` | `string` | `""` | Input placeholder value |
| `ariaLabel` | `string` | `""` | Input `aria-label` value |

## Prop Events
> Place on `<EmojiPopup>` component, **Not** your custom `<input>` - as this will override necessary events

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onClick` | `function` | - | Input element Click event (* Not emoji list) |
| `onChange` | `function` | - | Input value Change event |
| `onKeyDown` | `function` | - | Input KeyDown event |
| `onKeyUp` | `function` | - | Input KeyUp event |
| `onFocus` | `function` | - | Input Focus event |
| `onBlur` | `function` | - | Input Blur event |

## Styling

#### Input
Input contains the className `emoji-popup-lister-input`. This can also be overridden by passing your own input component with a `className` prop after the required `{...props}`

#### Popup
Currently there are no theming options. But most elements will follow the format `emoji-popup-lister-*` if you want to add your own custom CSS. The "Prop Options" section above contains a few basic display settings as well.

## Todo
- Support type-search immediately after an existing emoji character
- Option to replace full emoji string automatically (2 colons)
- Deleting "combo" emojis on Firefox doesn't remove the entire emoji

## License
MIT © [nicfontaine](https://github.com/nicfontaine)
