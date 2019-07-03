/***********
 * GLOBAL CONSTANTS
 ***********/
var VERSION = "1.6.0 BETA";

var IS_MOBILE_OR_TABLET = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var PREFERENCES = {}; //set when logging in

var MAX_INT = Math.pow(2, 63) - 1;
var UNIT = 100000000; //# satoshis in whole
var MIN_FEE = 2 * UNIT; // in satoshis (== .0002 BTC)
var REGULAR_DUST_SIZE = UNIT;
var MULTISIG_DUST_SIZE = UNIT * 2;
var MIN_PRIME_BALANCE = 50000; //in satoshis ... == .0005
var ASSET_CREATION_FEE_XCP = 0.5; //in normalized XCP
var MAX_ASSET_DESC_LENGTH = 41; //42, minus a null term character?
var FEE_FRACTION_REQUIRED_DEFAULT_PCT = .9;   //0.90% of total order
var FEE_FRACTION_PROVIDED_DEFAULT_PCT = 1;   //1.00% of total order
var FEE_FRACTION_DEFAULT_FILTER = .95;
var BTC_ORDER_MIN_AMOUNT = 0.01;

var DEFAULT_NUM_ADDRESSES = 1; //default number of addresses to generate. Go with 1 for now to be more newbie friendly
var MAX_ADDRESSES = 20; //totall arbitrary :)

//Order expiration
var ORDER_DEFAULT_EXPIRATION = 4032; //num blocks until expiration (at ~9 min per block this is ~6.75 days)
var ORDER_BTCSELL_DEFAULT_EXPIRATION = 4032; //num blocks until expiration for selling BTC order
var ORDER_MAX_EXPIRATION = 8064; //max expiration for order

var STATS_MAX_NUM_TRANSACTIONS = 1000; //max # transactions to show in the table
var VIEW_PRICES_NUM_ASSET_PAIRS = 50; //show market info for this many pairs
var VIEW_PRICES_ASSET_PAIRS_REFRESH_EVERY = 5 * 60 * 1000; //refresh asset pair market info every 5 minutes
var VIEW_PRICES_NUM_LATEST_TRADES = 50; //show this many latest trades on the view prices page
var VIEW_PRICES_LATEST_TRADES_REFRESH_EVERY = 5 * 60 * 1000; //refresh latest trades every 5 minutes

var MARKET_INFO_REFRESH_EVERY = 5 * 60 * 1000; //refresh market info every 5 minutes while enabled (on buy/sell page, and view prices page) 

var CHAT_NUM_USERS_ONLINE_REFRESH_EVERY = 1 * 60 * 1000; //refresh online user count every 5 minutes while enabled

var NUM_BLOCKS_TO_WAIT_FOR_BTCPAY = 10; //number of blocks to wait until the user can make a BTCpay on an order match where they owe BTC

var ALLOW_UNCONFIRMED_INPUTS = false;  // allow use unconfirmed unspents

var B26_DIGITS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

var ACTION_PENDING_NOTICE = "<b><u>This action will take some time to complete</u></b>, and will appear as a Pending Action until"
  + " confirmed on the network. <b class='errorColor'>Until that time, the wallet will not reflect the change. Please be patient.</b>";

var DEFAULT_PREFERENCES = {
  'num_addresses_used': DEFAULT_NUM_ADDRESSES,
  'address_aliases': {},
  'selected_theme': 'ultraLight',
  'selected_lang': 'en-us',
  'watch_only_addresses': [],
  'armory_offline_addresses': [],
  'auto_btcpay': true, //default to auto BTC payments being enabled
  'has_accepted_license': true
};

var ENTITY_NAMES = {
  'burns': 'Burn',
  'debits': 'Debit',
  'credits': 'Credit',
  'sends': 'Send',
  'orders': 'Order',
  'order_matches': 'Order Match',
  'btcpays': 'BTCPay',
  'issuances': 'Issuance',
  'broadcasts': 'Broadcast',
  'dividends': 'Distribution',
  'cancels': 'Cancel',
  'callbacks': 'Callback',
  'order_expirations': 'Order Expired',
  'order_match_expirations': 'Order Match Exp',
};

var ENTITY_ICONS = {
  'burns': 'fa-fire',
  'debits': 'fa-minus',
  'credits': 'fa-plus',
  'sends': 'fa-share',
  'orders': 'fa-bar-chart-o',
  'order_matches': 'fa-exchange',
  'btcpays': 'fa-btc',
  'issuances': 'fa-magic',
  'broadcasts': 'fa-rss',
  'dividends': 'fa-ticket',
  'cancels': 'fa-times',
  'callbacks': 'fa-retweet',
  'order_expirations': 'fa-clock-o',
  'order_match_expirations': 'fa-clock-o',
};

var ENTITY_NOTO_COLORS = {
  'burns': 'bg-color-yellow',
  'debits': 'bg-color-red',
  'credits': 'bg-color-green',
  'sends': 'bg-color-orangeDark',
  'orders': 'bg-color-blue',
  'order_matches': 'bg-color-blueLight',
  'btcpays': 'bg-color-orange',
  'issuances': 'bg-color-pinkDark',
  'broadcasts': 'bg-color-magenta',
  'dividends': 'bg-color-pink',
  'cancels': 'bg-color-red',
  'callbacks': 'bg-color-pink',
  'order_expirations': 'bg-color-grayDark',
  'order_match_expirations': 'bg-color-grayDark',
};

var MAINNET_UNSPENDABLE = 'PKekDaqXXXXXXXXXXXXXXXXXXXXXWH8yfH';
var TESTNET_UNSPENDABLE = 'mvKekDaqXXXXXXXXXXXXXXXXXXXXaupTK1';
var MAINNET_DONATION = 'PKekDaqXXXXXXXXXXXXXXXXXXXXXWH8yfH';
var TESTNET_DONATION = 'mvKekDaqXXXXXXXXXXXXXXXXXXXXaupTK1';

/***********
 * IS_DEV / USE_TESTNET
 ***********/
function qs(key) {
  //http://stackoverflow.com/a/7732379
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
  var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

//Allow the site root to specify "dev" and "testnet" parameters...
// IS_DEV is enabled if the initial (root) URL access has ?dev=1
// USE_TESTNET is enabled if the initial (root) URL access has ?testnet=1, OR the hostname visited starts with 'testnet' (e.g. testnet.myhost.com)
var IS_DEV = (location.pathname == "/" && qs("dev") && qs("dev") != '0' ? true : false);
var USE_TESTNET = false; //(   (((location.pathname == "/" || location.pathname == "/src/" || location.pathname == "/build/") && qs("testnet") && qs("testnet") != '0')
               //    || location.hostname.indexOf('testnet') != -1) ? true : false
              //    );

var BURN_START, BURN_END, BURN_MULTIPLIER = 50;
var BURN_SECOND_START, BURN_SECOND_END, BURN_SECOND_MULTIPLIER = 10;
if (USE_TESTNET) {
  if (typeof TESTNET_BURN_START !== "undefined") {
    BURN_START = TESTNET_BURN_START;
    BURN_END = TESTNET_BURN_END;
  }
} else {
  if (typeof LIVENET_BURN_START !== "undefined") {
    BURN_START = LIVENET_BURN_START;
    BURN_END = LIVENET_BURN_END;
    BURN_SECOND_START = 1489487;
    BURN_SECOND_END = 2800000;
  }
}
var BURNABLE = !!BURN_START;
var UNSPENDABLE = USE_TESTNET ? TESTNET_UNSPENDABLE : MAINNET_UNSPENDABLE;

var TESTNET_PASSPHRASE = qs("passphrase");

var CRYPTED_PASSPHRASE;
if (location.hash.indexOf('cp=') == 1) {
  CRYPTED_PASSPHRASE = location.hash.substr(4);
  location.hash = '';
}
location.hash = '';


var ORIG_REFERER = document.referrer;

//CONSTANTS THAT DEPEND ON IS_DEV / USE_TESTNET
var BLOCKEXPLORER_URL = USE_TESTNET ? "http://explorer.memetic.ai" : "http://explorer.memetic.ai";
var GOOGLE_ANALYTICS_UAID = null; //will be set in counterwallet.js
var ROLLBAR_ACCESS_TOKEN = null; //will be set in counterwallet.js

var TRANSACTION_DELAY = 90000 // delay between transaction to avoid error -22 (vin reused)
var TRANSACTION_MAX_RETRY = 5 // max retry when transaction failed (don't include first transaction, so 3 retry means 4 queries)

var DONATION_ADDRESS = USE_TESTNET ? TESTNET_DONATION : MAINNET_DONATION;

var APPROX_SECONDS_PER_BLOCK = USE_TESTNET ? 1 * 60 : 1 * 60; //a *rough* estimate on how many seconds per each block (used for estimating open order time left until expiration, etc)

var USER_COUNTRY = ''; //set in login.js
var CURRENT_PAGE_URL = ''; // set in loadUrl()

var DISABLED_FEATURES_SUPPORTED = ['dividend', 'exchange', 'leaderboard', 'portfolio', 'stats', 'history']; //what can be disabled
var DISABLED_FEATURES = []; //set in counterwallet.js

// restricted action
var RESTRICTED_AREA = {
//  these are all completely removed from the code in Kekdaq
//  'pages/betting.html': ['US'],
//  'pages/openbets.html': ['US'],
//  'pages/matchedbets.html': ['US'],
//  'pages/rps.html': ['US'],
//  'dividend': ['US']
}

var MAX_SUPPORT_CASE_PROBLEM_LEN = 4096;




