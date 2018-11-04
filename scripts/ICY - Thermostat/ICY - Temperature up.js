// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: thermometer-half;
// author: Wouter Janson
// website: https://wouterjanson.nl

// Setup
if (!Keychain.contains("ICY_Password")) {
    var alert = new Alert()
    alert.title = "ICY Thermostat"
    alert.message = "Please first run the 'Set credentials' script, in order to use this script"
    alert.present()
    return;
}

let apiUrl = Keychain.get("ICY_API")
let username = Keychain.get("ICY_Username")
let password = Keychain.get("ICY_Password")
let room = Keychain.get("ICY_Room")

// Login
let loginReq = new Request(apiUrl + "/login")
loginReq.method = "POST"
loginReq.addParameterToMultipart("username", username)
loginReq.addParameterToMultipart("password", password)

let loginJson = await loginReq.loadJSON()
let token = loginJson['token']
let uid = loginJson['serialthermostat1']

// Get Temperature
let tempReq = new Request(apiUrl + "/data")
tempReq.method = "GET"
tempReq.formData = {"username" : username, "password": password}
tempReq.headers = {"Session-token" : token}

let tempJson = await tempReq.loadJSON()
let temperature = tempJson['temperature2']
let targetTemperature = tempJson['temperature1']

// Set Temperature
let setReq = new Request(apiUrl + "/data")
setReq.method = "POST"
setReq.addParameterToMultipart("uid", uid)
setReq.addParameterToMultipart("temperature1", `${targetTemperature + 1}` )
setReq.headers = {"Session-token" : token}

await setReq.load()

// Display
let html = `
<style>
div {
    display: table;
    height: 100%;
    width: 100%;
    text-align: center;
    background: #222;
}
h1 {
    font-family:Helvetica Neue; 
    font-size:72;
    color: white;
    display: table-cell;
    vertical-align: middle;
}
</style>

<div>
    <h1>Temperature: ${temperature}℃ </br> Target: ${targetTemperature + 1}℃</h1>
</div>
`

if (config.runsWithSiri) {
    Speech.speak(`I've raised the target temparature in the ${room} from ${targetTemperature}°C to ${targetTemperature + 1}°C`)
}

WebView.loadHTML(html, null, new Size(0, 150))