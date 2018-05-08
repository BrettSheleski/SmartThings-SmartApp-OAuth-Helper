# SmartThings SmartApp OAuth Helper
Simple node app for authenticating with SmartThings to gain an access token to be used by other tools.

## Prerequesites
Have Node and git installed and ability to use npm.
- Node Homepage: https://nodejs.org/en/
- Git Homepage:  https://git-scm.com/

## Setup Example


### Adding SmartApp to SmartThings
1. Log in to the [SmartThings IDE](https://graph.api.smartthings.com/)
2. Go to `My SmartApps`
3. Click `New SmartApp`
4. In the `From Code` tab paste in the code for your SmartApp.

The following can be used as an example dummy SmartApp.

```
definition(
    name: "DummySmartApp",
    namespace: "BrettSheleski",
    author: "Brett Sheleski",
    description: "Dummy SmartApp for demonstration purposes",
    category: "SmartThings Labs",
    iconUrl: "http://cdn.device-icons.smartthings.com/Outdoor/outdoor1-icn.png",
    iconX2Url: "http://cdn.device-icons.smartthings.com/Outdoor/outdoor1-icn@2x.png"
)

preferences {
    input "switches", "capability.switch", title: "Switches", required: true, multiple: true
}

mappings {
  path("/all-on") {
    action: [
      POST: "allOn"
    ]
  }

  path("/all-off") {
    action: [
      POST: "allOff"
    ]
  }
}

def allOn(){
    switches.each{
        it.on();
    }
}

def allOff(){
    switches.each{
        it.off();
    }
}
```

5. Click `Create`
6. Click `Publish` --> `For Me`



### Enable OAuth in SmartApp
1. Log in to the [SmartThings IDE](https://graph.api.smartthings.com/)
2. Go to `My SmartApps`
3. Click the `Edit Properties` button next to desired SmartApp
4. Expand the `OAuth` section
5. Click the `Enable OAuth in Smart App` button
 
  The necessary Client ID and Client Secret fields will get automatically generated after saving.

6. Click `Update` to save.
7. Expand the `OAuth` section (again).
8. **Make note of the generated `Client ID` and `Client Secret` fields**


### Installing SmartApp
Open the SmartThings app:
1.  Select `Automation` tab (on bottom)
2.  Select `SmartApps` tab (on top)
3.  Scroll to the bottom and select `Add a SmartApp`
4.  Scroll to the bottom and select `My Apps`
5.  Find the SmartApp published previously (example: `DummySmartApp`)
6.  Follow the steps to properly configure the SmartApp.  (For the DummySmartApp select the desired switch devices to be controlled by the SmartApp.)

## Usage
### Download and run the script

```
git clone https://github.com/BrettSheleski/SmartThings-SmartApp-OAuth-Helper.git
cd SmartThings-SmartApp-OAuth-Helper
npm install
npm start
```

The app will start a web server listening on port 3000.

### Finish by using a web browser
1. Open your web browser to http://localhost:3000
2. Enter in the `Client ID` of the SmartApp and press Submit (see Step #8 in `Enable OAuth in SmartApp` above )
3. Authenticate with SmartThings and authorize the request granting access to the necessary devices.
4. Enter the Client Secret of the SmartApp and press Submit.
5. In the results area the Access Token and Endpoints for use with the SmartApp will be displayed.

## Now What?
After completing the above steps properly you should be displayed two text areas displaying some JSON code.

Access Token
```JSON
{
    "access_token": "6e41cf0e-5a1c-4b33-926b-31e559b277db",
    "token_type": "bearer",
    "expires_in": 1576799999,
    "scope": "app"
}
```

Endpoints
```JSON
[
    {
        "oauthClient": {
            "clientId": "e7203aee-9fdb-453d-94b2-96e8d1840576"
        },
        "location": {
            "id": "02ecccb5-d3af-41eb-8898-36caccb06edf",
            "name": "Home"
        },
        "uri": "https://graph-na02-useast1.api.smartthings.com:443/api/smartapps/installations/9593aaed-1513-4d30-9ae3-f2cd4e11a2e2",
        "base_url": "https://graph-na02-useast1.api.smartthings.com:443",
        "url": "/api/smartapps/installations/9593aaed-1513-4d30-9ae3-f2cd4e11a2e2"
    }
]
```

Make note of the `access_token` field from the Access Token JSON and the `uri` field from the Endpoints JSON


### Using Curl to access the endpoints.
Using the information from above, we can have the following info:
- `access_token` : 6e41cf0e-5a1c-4b33-926b-31e559b277db
- `uri` : https://graph-na02-useast1.api.smartthings.com:443/api/smartapps/installations/9593aaed-1513-4d30-9ae3-f2cd4e11a2e2

We can use Curl to call the endpoints exposed by the SmartApp.  In the example DummySmartApp, there are two endpoints defined by the SmartApp are `/all-on` and `/all-off`.  

The Urls for those two endpoints are:
- https://graph-na02-useast1.api.smartthings.com:443/api/smartapps/installations/9593aaed-1513-4d30-9ae3-f2cd4e11a2e2/all-on
- https://graph-na02-useast1.api.smartthings.com:443/api/smartapps/installations/9593aaed-1513-4d30-9ae3-f2cd4e11a2e2/all0ff

Accessing the `/all-on` endpoint.  This will end up calling the `allOn()` method of the SmartApp.
```bash
curl -H "Authorization: Bearer 6e41cf0e-5a1c-4b33-926b-31e559b277db" -X POST "https://graph-na02-useast1.api.smartthings.com:443/api/smartapps/installations/9593aaed-1513-4d30-9ae3-f2cd4e11a2e2/all-on"
```

Accessing the `/all-off` endpoint.  This will end up calling the `allOff()` method of the SmartApp.
```bash
curl -H "Authorization: Bearer 6e41cf0e-5a1c-4b33-926b-31e559b277db" -X POST "https://graph-na02-useast1.api.smartthings.com:443/api/smartapps/installations/9593aaed-1513-4d30-9ae3-f2cd4e11a2e2/all-off"
```

## Additional Resources:

RTFM:  http://docs.smartthings.com/en/latest/smartapp-web-services-developers-guide/authorization.html