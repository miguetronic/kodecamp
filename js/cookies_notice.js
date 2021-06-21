
const btnAcceptCookies = document.getElementById("btn-accept-cookies");
const noticeCookies = document.getElementById("notice-cookies");
const noticeCookiesBackground = document.getElementById("notice-cookies-background");

btnAcceptCookies.addEventListener("click", () => {

    document.cookie = "CookieBy=mitiendita.com; max-age=" + 60 * 60 * 24 * 30;
    if (document.cookie) { //if cookie is set
        noticeCookies.classList.remove("active-cookies");
        noticeCookiesBackground.remove("active-cookies");
        //hide cookie box
    } else { //if cookie not set then alert an error
        alert("Cookie can't be set! Please unblock this site from the cookie setting of your browser.");
    }
});

let checkCookie = document.cookie.indexOf("CookieBy=mitiendita.com"); //checking our cookie
//if cookie is set then hide the cookie box, else show it
if (checkCookie != -1) {
    noticeCookies.classList.remove("active-cookies");
    noticeCookiesBackground.remove("active-cookies");
} else {
    noticeCookies.classList.add("active-cookies");
    noticeCookiesBackground.add("active-cookies");
}