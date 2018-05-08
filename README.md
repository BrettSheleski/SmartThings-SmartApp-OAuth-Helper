# SmartThings SmartApp OAuth Helper
Simple node app for authenticating with SmartThings to gain an access token to be used by other tools.

## Prerequesites
Have Node and git installed and ability to use npm.
Node Homepage: https://nodejs.org/en/
Git Homepage:  https://git-scm.com/

## 1.  Download and run the script

```
git clone https://github.com/BrettSheleski/SmartThings-SmartApp-OAuth-Helper.git
cd SmartThings-SmartApp-OAuth-Helper
npm install
npm start
```

The app will start a web server listening on port 3000.

### 2. Open your web browser to http://localhost:3000
### 3. Enter in the CLient ID of the SmartApp and press Submit
### 4. Authenticate with SmartThings and authorize the request granting access to the necessary devices.
### 5. Enter the Client Secret of the SmartApp and press Submit.
### 6. In the results area the Access Token and Endpoints for use with the SmartApp will be displayed.
    