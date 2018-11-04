// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: umbrella;

Location.setAccuracyToThreeKilometers()
var location = await Location.current()
html = `
<iframe src="https://gadgets.buienradar.nl/gadget/zoommap/?lat=${location.latitude}&lng=${location.longitude}&overname=2&zoom=13&size=3&voor=1" frameborder=no style="-webkit-transform: scale(1.75);  -webkit-transform-origin: 0 0;"></iframe>
`
WebView.loadHTML(html, null, new Size(0, 330))