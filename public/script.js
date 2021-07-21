const cookieVersion = 5.1;
const currentCookieVersion = getCookie("cookieVersion");

var money;
var burgers;
var wraps;
var sandwichs;

var autoPrinter = true;
var autoPrinters = 2;


if (currentCookieVersion != cookieVersion) {
    console.log(`%cCookies are out of date! (v${currentCookieVersion} > v${cookieVersion})`, 'color: #e03838');
}
else {
    console.log(`%cCookies are up to date! (v${currentCookieVersion})`, 'color: #3ee038')
}

if (currentCookieVersion == null) {
    setCookie("cookieVersion", cookieVersion);
    location.reload();
}

function VerifyCookie(cname, cvalue) {
    if (getCookie(cname) == null) {
        console.log(`Cookie "${cname}" does not exists!\nInitialising...`)
        
        window[cname] = cvalue;
        // Default cookies
        setCookie(cname, cvalue);
    }
    else {
        console.log(`Cookie "${cname}" exists!`)
        window[cname] = parseInt(getCookie(cname));
    }
}

function InitCookies() {
    VerifyCookie("money", 0)
    VerifyCookie("burgers", 0)
    VerifyCookie("wraps", 0)
    VerifyCookie("sandwichs", 0)
}
InitCookies();

/////////////////////////////////

const updateButtonRef = document.querySelector("#updateButton");
const resetButtonRef = document.querySelector("#resetButton");

const moneyCountRef = document.querySelector("#moneyCount");
const makemoneyBtnRef = document.querySelector("#makemoneyBtn");

const burgerCountRef = document.querySelector("#burgerCount");
const buyBurgerBtnRef = document.querySelector("#buyBurgerBtn");

const wrapCountRef = document.querySelector("#wrapCount");
const buyWrapBtnRef = document.querySelector("#buyWrapBtn");

const sandwichCountRef = document.querySelector("#sandwichCount");
const buySandwichBtnRef = document.querySelector("#buySandwichBtn");

makemoneyBtnRef.addEventListener("click", function() {
    setCookie("money", ++money); // Add burger
    setInnerHTML(moneyCountRef, money);
});

buyBurgerBtnRef.addEventListener("click", function() {
    buySomething("burgers", burgers, buyBurgerBtnRef, burgerCountRef, 10);
});

buyWrapBtnRef.addEventListener("click", function() {
    buySomething("wraps", wraps, buyWrapBtnRef, wrapCountRef, 15);
});

buySandwichBtnRef.addEventListener("click", function() {
    buySomething("sandwichs", sandwichs, buySandwichBtnRef, sandwichCountRef, 25);
});

function buySomething(itemname, item, itemRef, countRef, cost) {
    if (money >= cost)
    {
        setCookie(itemname, ++item); // Add item
        setCookie("money", (money - cost)); // Remove money
    }
    else {
        itemRef.children[2].style.display = "block";
        setTimeout(function(){
            itemRef.children[2].style.display = "none";
        }, 1000);
    }
    setInnerHTML(countRef, item);
    setInnerHTML(moneyCountRef, money);
}


function setInnerHTML(element, value) {
    if (element == moneyCountRef) {
        element.innerHTML = `¤${value}`;
    }
    else {
        element.innerHTML = value;
    }
}

function auto() {
    setCookie("money", ++money);
    setInnerHTML(moneyCountRef, money);
    setTimeout("auto()", 1000 / autoPrinters);
}
auto();

function ClearCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

resetButtonRef.addEventListener("click", function() {
    if (confirm('Reset all data?')) {
        money = 0;
        burgers = 0;
        wraps = 0;
        sandwichs = 0;

        ClearCookies();
        location.reload();
    }
});

if (typeof(w) == "undefined") {
    w = new Worker("autoworkers.js");
}

//
// Initialise text
//
setInnerHTML(moneyCountRef, money);
setInnerHTML(burgerCountRef, burgers);
setInnerHTML(wrapCountRef, wraps);
setInnerHTML(sandwichCountRef, sandwichs);


function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    window[cname] = cvalue;
}
  
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return null;
}
