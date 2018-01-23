// created by Reynold Harbin on 5/24/17
// reynold@digitalocean.com


var logTag = "config-web.js:";

exports.apikeys  = {
    doFindMeAppId: "devQuestWebAppId-AdkfRdd5$",
    doFindMeClientAppId: "devQuestWeb-AdjfAdaD(08*",
	mixPanelToken: "randomStringFromMixPanel-p",
	devMixPanelToken: "randomStringFromMixPanel-d"
}

exports.build  = {
  forProduction: false,
  forDevelopment: true
}

exports.settings  = {
  prodAPIUrl: "http://api.devquest.io:3000/search", //PRODUCTION
  devAPIUrl: "http://localhost:3000/search" //DEVELOPMENT
}

