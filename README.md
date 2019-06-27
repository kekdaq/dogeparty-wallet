kekdaq-wallet 
================

Online Webwallet for [Kekdaq](http://www.kekdaq.com).

Originally based off of Carbonwallet / Counterwallet


Production Systems
-------------------

* Mainnet: **[http://kekdaq.com](http://kekdaq.com).**
* Testnet: **[http://test.kekdaq.com](http://test.kekdaq.com).**


Features
----------

- Deterministic wallet addresses (BIP 32-based)
- Supports the majority of Kekdaq / Counterparty functionality
- Fully-AJAX driven
- Anonymous
- Runs in the browser, with keys created in user's local memory. 
- Private keys are not sent to the server and users control their own funds.


Build Instructions
-------------------

Requires Node 0.10.48, recommend using [Node Version Manager](https://github.com/creationix/nvm)

## Install proper version of Node using NVM
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

nvm install 0.10.48
nvm use 0.10.48
```
### Before running the build system:
```
npm install -g grunt-cli bower
```

### To build:
```
git clone https://github.com/cyberpepe/kekdaq-wallet
cd kekdaq-wallet
cd src
bower install
cd ..
npm install
```

### To (re)build the static (i.e. minified) site:
```
grunt build
```

### To regenerate dependencies hash file (```src/.bowerhashes```):
```
grunt freeze
```

Setting up your own Kekdaq Server
-----------------------------------------

Documentation currently being compiled

License
-------------------

http://opensource.org/licenses/CDDL-1.0
