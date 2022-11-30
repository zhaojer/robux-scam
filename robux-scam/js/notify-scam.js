const textToDisplay = [
    "Congratulations!",
    "You have successfully fallen for a scam!",
    "$ Don't worry. Your information is safe because we did not save any of the data you entered.",
    "$ This website is solely an education site that aims to show you what a typical scam or phishing looks like.",
    "$ However, if this were a real scam or phishing, then all of the information you have entered would have been stolen.",
    "$ We will demonstrate all the tricks and scams we used on our website, page-by-page.",
    "$ Click the button below to start the education."
];

const IDList = [
    "zero",
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five"
]

// display the motivational text, one character at a time
// type one text in the typwriter
// keeps calling itself until the text is finished
function typeWriter(text, i, ID, fnCallback) {
    // check if text isn't finished yet
    if (i < (text.length)) {
        // add next character to strong
        document.getElementById(ID).innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
        // wait for a while and call this function again for next character
        setTimeout(function () {
            typeWriter(text, i + 1, ID, fnCallback)
        }, 100);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == 'function') {
        // call callback after timeout
        setTimeout(fnCallback, 3000);
    }
}
// start a typewriter animation for a text in the dataText array
function StartTextAnimation(i) {
    if (typeof textToDisplay[i] == 'undefined') {
        let butt = document.createElement("button");
        butt.className = "btn btn-successbtn btn-outline-success myButton";
        butt.innerText = "Continue";
        document.getElementById("continue").appendChild(butt);
        return;
    }
    // check if dataText[i] exists
    if (i < textToDisplay[i].length) {
        // text exists! start typewriter animation
        typeWriter(textToDisplay[i], 0, IDList[i], function () {
            // after callback (and whole text has been animated), start next text
            StartTextAnimation(i + 1);
        });
    }
}

async function sendEmail() {
    try {
        // hardcoded email api server
        const emailAPI = "http://127.0.0.1:5000";
        await fetch(
            `${emailAPI}/api/v1/send/`,
            {
                method: "POST",
                credentials: "include"
            }
        );
    } catch (e) {
        // do nothing on error or if server is not set up
        console.log(e);
    }
}

sendEmail();
StartTextAnimation(0);
