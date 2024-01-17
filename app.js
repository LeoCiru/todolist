// Variables
const messageBox = document.getElementById('messageBox'),
    sendBtn = document.getElementById('sendBtn'),
    tasksList = document.querySelector('.tasksList'),
    errorContainer = document.querySelector('.errorContainer');
let tweets = [];


loadEvents();

function loadEvents() {
    sendBtn.addEventListener('click', addTweet);
}


function addTweet(e) {
    e.preventDefault();

    if (messageBox.value == '') {
        console.log('BOBOP');
        createError('Por favor, escribe algo.');
        return;
    }

    createHTML(messageBox.value);
}

function createHTML(tweet) {

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    tweets = [...tweets, tweetObj]
    clearHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            console.log(tweets)
            const element = document.createElement('LI');

            element.innerText = tweet.tweet;
            tasksList.appendChild(element);
        })
    }

    messageBox.value = '';
}

function clearHTML() {
    while (tasksList.firstChild) {
        tasksList.removeChild(tasksList.firstChild)
    }
}

function createError(message) {
    const error = document.createElement('P');

    clearError();

    error.innerText = message;
    error.classList.add('error');

    errorContainer.appendChild(error);

    setTimeout(() => {
        errorContainer.removeChild(error);
    }, 2000);
}

function clearError() {
    while (errorContainer.firstChild) {
        errorContainer.removeChild(errorContainer.firstChild)
    }
}