# Vinted Dark Mode

A lightweight userscript that adds a clean **dark mode** to [Vinted](https://www.vinted.com), on every country domain. Photos, videos and avatars keep their original colors.

## Features

- Works on all Vinted domains (`.fr`, `.de`, `.es`, `.it`, `.co.uk`, `.com`, etc.)
- Photos, videos, avatars and embedded iframes (e.g. payment forms) are **not** color-inverted
- Applied at page start, so there is **no white flash** while loading
- Independent of Vinted's CSS class names, so it keeps working when the site is updated
- Toggle on/off with a keyboard shortcut or the userscript manager menu
- Your choice is remembered between visits
- Disabled when printing

## Installation

### 1. Install a userscript manager

| Browser | Recommended extension |
|---|---|
| Firefox / LibreWolf | [Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/) or [Violentmonkey](https://addons.mozilla.org/firefox/addon/violentmonkey/) |
| Chrome / Edge / Brave | [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/) |
| Safari | [Userscripts](https://apps.apple.com/app/userscripts/id1463298887) or Tampermonkey |

> **Chrome / Edge users:** open `chrome://extensions`, go to the extension's **Details**, and enable **Allow User Scripts** (you may also need to turn on **Developer mode**). Without this, no userscript will run.

### 2. Install the script

**Option A – One click:** open the raw file and your userscript manager will offer to install it:

```
https://github.com/FlerkenMind/vinted-dark-mode/blob/main/main.js
```

**Option B – Manual:** open your userscript manager, create a new script, paste the contents of main.js and save.

Then reload Vinted.

## Usage

| Action | How |
|---|---|
| Toggle dark mode | `Alt` + `Shift` + `D` |
| Toggle from the menu | Click the userscript manager icon, then **ON / OFF dark mode** |

## How it works

The script injects a small piece of CSS that:

1. Inverts the whole page (`filter: invert(1) hue-rotate(180deg)`), which turns white into black while the hue rotation keeps colors such as Vinted's teal recognizable.
2. Applies the same filter a second time on media elements (`img`, `video`, `canvas`, `iframe`, elements with a CSS `background-image`), which cancels the inversion and restores their original colors.

The CSS is injected with `GM_addStyle`, with fallbacks to a constructed stylesheet and a regular `<style>` element, so it also works on pages with a strict Content Security Policy.

## Customization

Everything visual lives in the `CSS` constant at the top of the script. For example, to get a slightly softer dark background, adjust the filter on `html`:

```css
html {
  filter: invert(1) hue-rotate(180deg) brightness(0.95) contrast(0.95) !important;
}
```

Note that this also slightly affects media, since they are only re-inverted, not re-brightened.

## Troubleshooting

- **Nothing changes:** check that the script is enabled in your userscript manager, and that its version matches the one in this repository.
- **Chrome / Edge:** make sure **Allow User Scripts** is enabled (see above).
- **Private windows:** extensions are disabled there by default. Enable "Run in private windows" in the extension settings.
- **Check the console:** open the developer tools (`F12`); you should see `[Vinted Dark Mode] chargé, actif : true`.
- **Something looks wrong:** please [open an issue](../../issues) with a screenshot and the page URL.

## Known limitations

- Elements with a CSS `background-image` that also contain text may show that text with unexpected colors.
- Because the dark mode relies on color inversion, some very specific colors may differ slightly from what a native dark theme would use.

## Contributing

Issues and pull requests are welcome.

## License

[MIT](LICENSE)

---

*This project is not affiliated with, endorsed by, or sponsored by Vinted.*
