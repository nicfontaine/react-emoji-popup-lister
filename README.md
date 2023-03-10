# React Emoji Popup Lister
> Slack-lick emoji list and select via keyboard

[![NPM](https://img.shields.io/npm/v/react-emoji-popup-lister.svg)](https://www.npmjs.com/package/react-emoji-popup-lister)

![Screenshot](https://github.com/nicfontaine/react-emoji-popup-lister/blob/main/img/screenshot-01.png)

## 📁 About
Type and insert emojis within your inputs, via their shortcode values.   
`:cool:` :cool:

## ⌨️ Install
```bash
npm i -s react-emoji-popup-lister
```

## 🚀 Usage

### 1. Basic
```jsx
import EmojiPopup from "react-emoji-popup-lister"

export default function ExampleA () {
  return <EmojiPopup />
}
```

### 2. Custom styling with props
```jsx
import EmojiPopup from "react-emoji-popup-lister"

export default function ExampleB () {
  return (
    <EmojiPopup
      listMax="40"
      maxHeight="200px"
      maxWidth="300px"
      placeholder="Add a profile description"
      theme="light"
			ariaLabel="Profile description input"
    />
  );
}
```

### 3. Provide an input component, state, and events from your parent component
Also wrap in a container div, to align the input and popup   

```jsx
import { useState, useEffect } from "react";
import EmojiPopup from "react-emoji-popup-lister"

// Your input with props passed, including input value state
function Input (props) {
	
  useEffect(() => { }, [props.value]);
  
  return (
    <input
      // Required. Anything after is optional, and will override values
      {...props}
      // Override or extend default values
      className="your-class-name"
      placeholder="Your placeholder text"
      style={{ ...props.style, width: "100%" }}
    />
  );
}

// Parend component with state, passed input, events, etc.
export default function ExampleC () {
	
  const [text, setText] = useState("");
  useEffect(() => { }, [inputText]);
  
  const handleChange = function (e) { };

  return (
    {/* Container to align input and popup together */}
    <div style={{ maxWidth: "400px", margin: "1rem auto 0"}}>
      <EmojiPopup
        input={Input}
        inputText={text}
        setInputText={setText}
        onChange={handleChange}
      >
        <div>Child content...</div>
      </EmojiPopup>
    </div>
  );
}
```

## 🗃️ Prop Options
> All are optional

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `input` | input/textarea component | `<input>` | Pass your own input element or component |
| `inputText` | useState `string` value | `""` | Store state in your parent component |
| `setInputText` | useState `function` | setState | Set `inputText` from inside Emoji component |
| `listMax` | `number` | `6` | Max number of emoji matches to display |
| `theme` | `light` `dark` `auto`  | `dark` | Popup display theme style |
| `maxWidth` | `number` | `400px` | Scroll container width cap |
| `maxHeight` | `number` | `250px` | Scroll container height cap |
| `placeholder` | `string` | `""` | Input placeholder value |
| `ariaLabel` | `string` | `""` | Input `aria-label` value |   
   
## 🪅 Prop Events
> Place on `<EmojiPopup>` component, **Not** your custom `<input>` - as this will override necessary events

| Prop | Description |
| --- | --- |
| `onClick` | Input element Click event (* Not emoji list) |
| `onChange` | Input value Change event |
| `onKeyDown` | Input KeyDown event |
| `onKeyUp` | Input KeyUp event |
| `onFocus` | Input Focus event |
| `onBlur` | Input Blur event |   
   
## 🗺️ Shortcuts
> These will `preventDefault` in the input while the popup is active

| Key | Function |
| --- | --- |
| `ArrowUp` | Up in emoji list |
| `ArrowDown` | Down in emoji list |
| `Home` | Start of emoji list |
| `End` | End of emoji list |
| `Enter` or `Tab` | Choose highlighted emoji |   
   
## 🖌️ Styling

#### Input
Input contains the className `emoji-popup-lister-input`. This can also be overridden by passing your own input component with a `className` prop after the required `{...props}`

#### Popup
Currently there are no theming options. But most elements will follow the format `emoji-popup-lister-*` if you want to add your own custom CSS. The "Prop Options" section above contains a few basic display settings as well.

## 🏗️ Todo
- (Bug) Support type-search immediately after an existing emoji character
- (Feature) Option to replace full emoji string automatically (2 colons)
- (Bug) Deleting "combo" emojis on Firefox doesn't remove the entire emoji
- (Bug) Escape to hide gets reset on successive typing
- (Feature) Add better positioning support

## 🖊️ License
MIT © [nicfontaine](https://github.com/nicfontaine)
