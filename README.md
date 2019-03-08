kekdaq-wallet fork of Counterwallet
================

Online Webwallet for [Kekdaq](http://www.kekdaq.com).

Originally based off of [Carbonwallet](http://www.carbonwallet.com) (however virtually all the original code has been removed or rewritten).


Production Systems
-------------------

* Mainnet: **[http://kekdaq.com](http://kekdaq.com).**
* Testnet: **[http://test.kekdaq.com](http://test.kekdaq.com).**


Features
----------

- Deterministic wallet addresses (BIP 32-based)
- Supports the majority of Counterparty functionality
- Fully-AJAX driven
- Anonymous
- Runs in the browser, with keys created in user's local memory


Browser Support
-------------------

**Desktop**

- Chrome 23+ (Preferred)
- Firefox 25+
- Safari 7+
- Opera 15+

Notably, Internet Explorer is **not** supported, due to its lack of full Content-Security-Policy support (even with IE 11).

**Mobile**

- IOS Safari 7+
- Android Browser 4.4+
- Chrome for Android 33+
- Chrome for iOS 35+
- Firefox for Android 26+


Build Instructions
-------------------

Requires Node 0.10.28, recommend using [Node Version Manager](https://github.com/creationix/nvm)

### Before running the build system:
```
sudo npm install -g grunt-cli bower
```

### To build:
```
cd src; bower install; cd ..
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
