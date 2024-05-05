# EmojiPicker Component

The `EmojiPicker` component is a user-friendly interface for selecting emojis. It renders a list of emojis and allows the user to click on an emoji to select it.

## Props

- `onEmojiClick`: A callback function that will be invoked when an emoji is clicked. It receives the selected emoji as an argument.

## Usage

To use the `EmojiPicker` component, import it into your React component and include it in your JSX code like this:

```
npm i emojiapp
```

```jsx
import EmojiPicker from "./EmojiPicker";
import baseImageFile from "emojiapp/build/images/merged-min-64.png";

function MyComponent() {
  const handleEmojiClick = (emoji) => {
    // Handle the selected emoji here
    console.log("Selected emoji:", emoji);
  };

  return (
    <div>
      <EmojiPicker onEmojiClick={handleEmojiClick} baseImg={baseImageFile} />
      {/* Rest of your component */}
    </div>
  );
}
```

## Acknowledgements

This package utilizes assets from the [Twemoji](https://github.com/twitter/twemoji) library, which provides open-source emoji graphics. Twemoji is licensed under the CC-BY 4.0 license. For more information about Twemoji and its license, please visit their GitHub repository.

## Contributions

All the contributions are accepted via PR and Issues Section. This is my first package that I published so there are some mistakes and I'll keep working on them to improve it.
