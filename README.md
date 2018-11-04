# Scriptable Collection
This repo contains some of my scripts that I use with the [Scriptable](https://scriptable.app) app on my iPhone in order to extend the functionality of Siri. Scriptable is even more powerfull than Siri Shortcuts because you can leverage the power of JavaScript and create visual responses.

This repo will occasionally be updated with new scripts.

## Buienradar
<img src="screenshot - Buienradar.png" height="300">

This script simply shows the [Buienradar](https://www.buienradar.nl) widget, based on your current location, within a webview in order to retrieve it using Siri. Only usable in NL and BE.

## ICY Thermostat
<img src="screenshot - ICY.png" height="300">

### Setting up
- `ICY - Set credentials.js` Used to store your credentials used by the other scripts
- `ICY - Current temperature.js` Gets the current and target temperature
- `ICY - Temperature down.js` Lowers the target temperature
- `ICY - Temperature up.js` Raises the target temperature

These scripts are pretty basic.

#### ICY - Set credentials.js
```Javascript
Keychain.set("ICY_Username", "MyUsername");
Keychain.set("ICY_Password", "MyPassword");
Keychain.set("ICY_Room", "my room"); // Used for Siri responses

Keychain.set("ICY_API", "https://portal.icy.nl"); // URL to ICY API, already set for the (Dutch) Essent E-Thermostaat
```

## Trakt.tv Movie Recommendations
<img src="screenshot - Trakt.tv.png" height="300">

This little script uses the [Trakt.tv](https://trakt.tv) API to retrieve your movie recommendations and displays them in a UITable. The posters are provided by the API from [The Movie Database](https://www.themoviedb.org)