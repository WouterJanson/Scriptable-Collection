// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: cogs;
// author: Wouter Janson
// website: https://wouterjanson.nl

// Enter your credentials and settings for use in the ICY scripts
Keychain.set("ICY_Username", "MyUsername");
Keychain.set("ICY_Password", "MyPassword");
Keychain.set("ICY_Room", "my room"); // Used for Siri responses

Keychain.set("ICY_API", "https://portal.icy.nl"); // URL to ICY API, already set for the (Dutch) Essent E-Thermostaat

// succes alet
var alert = new Alert()
alert.title = "ICY Thermostat"
alert.message = "All credentials are set! 🎉\nYou can now use the ICY scripts."
alert.present()