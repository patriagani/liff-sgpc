window.onload = function() {
    const useNodeJS = false
    const defaultLiffId = "1655320023-ZmWOJDBP"
    let myLiffId = ""
    myLiffId = defaultLiffId
    initialLiff(myLiffId)
}

function initialLiff(myLiffId) {
    if (!myLiffId) {
        document.getElementById("loginPage").classList.add('hidden')
        document.getElementById("errorPage").classList.remove('hidden')
    } else {
        createLiff(myLiffId);
    }
}

function createLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            checkLogin()
            checkClient()
        })
        .catch((err) => {
            document.getElementById("loginPage").classList.add('hidden')
            document.getElementById("errorPage").classList.remove('hidden')
        })
}

function checkLogin() {
    if (liff.isLoggedIn()) {
        assignProfile()
        document.getElementById("loginPage").classList.add('hidden')
        document.getElementById("contentPage").classList.remove('hidden')
    } else {
        document.getElementById("loginPage").classList.remove('hidden')
        document.getElementById("contentPage").classList.add('hidden')
    }
}

function checkClient() {
    if (liff.isInClient()) {
        document.getElementById("logoutButton").classList.add('hidden')
        document.getElementById("openExternalButton").classList.remove('hidden')
    } else {
        document.getElementById("openExternalButton").classList.add('hidden')
        document.getElementById("logoutButton").classList.remove('hidden')
    }
}

function assignProfile() {
    liff.getProfile()
    .then(profile => {
        const name = profile.displayName
        const profilePictureURL = profile.pictureUrl
        document.getElementById("profilePicture").src = profilePictureURL;
        document.getElementById("customerGreeting").innerHTML = `Halo ${name}, silahkan memilih menu yang tersedia dibawah ini :`;
    })
    .catch((err) => {
        console.log('error', err);
    })
}

function liffLogin() {
    if (!liff.isLoggedIn()) {
        liff.login();
    }
}

function liffLogout() {
    if (liff.isLoggedIn()) {
        liff.logout();
        window.location.reload();
    }
}