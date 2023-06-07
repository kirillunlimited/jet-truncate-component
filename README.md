# Truncator component

React component that truncates single-line text to fit a given container width keeping it's tail visible.

## Solution

To get the native browser's truncation I use the following styles:
```
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
```

In my approach I use canvas to create virtual container with the same styles as the original DOM container (`computedStyles.font`). Then I paste original text in this virtual container and truncate it recursevely by one character and add ellipsis with tail (`${text}...${tail}`). Then I measure it's width (`context.measureText(content).width`) until I reach the width that fits container's width.

I use memoization to save width values for already computed container sizes.

As there are some methods that trigger reflow (`window.getComputedStyle`, `containerRef.current.clientWidth`), I use `debounce` helper to wrap some of the calculation methods in it. These methods are wrapped with 0ms timeout. `debounce` uses `requestAnimationFrame` under the hood, so it allows event loop to manage expensive calculations.

As an additional performance improvement I would also suggest to use virtualized table.

## Checklist

* ✅ Proper truncation with specific API
* ✅ Built-in browser search
* ✅ String copying (selecting and copying truncated text saves original text to clipboard)
* ✅ Shrinking table render takes less than 500ms (I used React Dev Tools profile to check it)
* ✅ Checked in Chrome, Firefox and Safari
* ⛔️ No unit tests (more details in **Assumption** section)

## Assumptions

* There is a little problem with truncating text in the table in the in-between state: while resizing some of the few first pixels of the truncation there is no tail, it appears after further resize.
* I tried to write some basic tests for the Truncator component, but I got some problem because of the using canvas. I tried to add `jest-canvas-mock` but it didn't solve my problem. I believe that this problem would take too much time to resolve as I don't have much experience testing canvas. I hope, that lack of valid tests is not critical for passing this interview step.

## API

* *children* (required) – original text.
* *tailLength* (required) – the length of the non-truncating text. In other words, the last N characters of the line that should always be shown.
* *title* (optional) – text that appears as a hint on the hover of the original text (children).
* *className* (optional) – CSS class of the component's container.
* *style (optional)* - inline CSS styles (added for unit tests)

## Scripts

### `npm start`

Runs the app in the development mode.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

---
ℹ️ This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).