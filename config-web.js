//  Created by Reynold Harbin on 5/24/16.
//  Copyright © 2017 DigitalOcean, LLC. All rights reserved.
//

var logTag = "config-web.js:";

exports.apikeys  = {
    doFindMeAppId: "doFindMeAppId-AdkfRdd5$",
    doFindMeClientAppId: "doFindMeClientAppId-AdjfAdaD(08*",
	mixPanelToken: "randomStringFromMixPanel-p",
	devMixPanelToken: "randomStringFromMixPanel-d"
}

exports.build  = {
  forProduction: true,
  forDevelopment: false
}

exports.settings  = {
  prodAPIUrl: "http://dofind.me:3000/search", //PRODUCTION
  devAPIUrl: "http://localhost:3000/search" //DEVELOPMENT
}

