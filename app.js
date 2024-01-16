// Variables
const messageBox = document.getElementById('messageBox'),
    sendBtn = document.getElementById('sendBtn'),
    tasksList = document.querySelector('.tasksList');
let tweets = [];


loadEvents();

function loadEvents() {
    sendBtn.addEventListener('click', addTweet);
}


function addTweet(e) {
    e.preventDefault();

    if (messageBox.value == '') {
        console.log('BOBOP');
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

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            console.log(tweets)
            const element = document.createElement('LI');

            element.innerText = tweet.tweet;
            tasksList.appendChild(element);
        })
    }
}