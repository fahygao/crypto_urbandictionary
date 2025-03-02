$(document).ready(function() {
    const definitions = {
        "Bitcoin": {
            definition: "A decentralized digital currency, without a central bank or single administrator.",
            example: "I bought some Bitcoin last week, hoping the price will go up."
        },
        "Ethereum": {
            definition: "An open-source, decentralized blockchain platform with smart contract functionality.",
            example: "Many new projects are being built on the Ethereum blockchain."
        },
        "NFT": {
            definition: "A non-fungible token, a unique digital asset that represents ownership of real-world items like art, music, in-game items, and videos.",
            example: "I just purchased an NFT of a digital artwork."
        },
        "DeFi": {
            definition: "Decentralized Finance, an umbrella term for financial services on public blockchains.",
            example: "DeFi is changing the way we think about traditional banking."
        },
        "DAO": {
            definition: "Decentralized Autonomous Organization, an organization run through rules encoded as computer programs called smart contracts.",
            example: "The DAO manages its funds through a community voting process."
        }
    };

    let isLoggedIn = false;
    let userVotes = {}; 
    let userEmail = '';

    // Dummy comments
    const comments = {
        "Bitcoin": [
            { user: "satoshi.nakamoto@gmail.com", text: "Bitcoin is the future!", votes: 5 },
            { user: "vitalik.buterin@gmail.com", text: "A great start, but Ethereum is better.", votes: 2 },
            { user: "craig.wright@gmail.com", text: "I am Satoshi.", votes: -3 }
        ],
        "Ethereum": [
            { user: "gavin.wood@gmail.com", text: "Ethereum's scalability is impressive.", votes: 3 },
            { user: "charles.hoskinson@gmail.com", text: "Cardano will surpass Ethereum!", votes: 1 },
            { user: "justin.sun@gmail.com", text: "TRON is faster and cheaper.", votes: -2 }
        ],
        "NFT": [
            { user: "beeple@gmail.com", text: "NFTs are revolutionizing art.", votes: 4 },
            { user: "gary.vee@gmail.com", text: "NFTs are the future of everything!", votes: 3 },
            { user: "rightclicksaveas@gmail.com", text: "Just right-click and save.", votes: -5 }
        ],
        "DeFi": [
            { user: "andre.cronje@gmail.com", text: "DeFi is the wild west of finance.", votes: 6 },
            { user: "hayden.adams@gmail.com", text: "Uniswap made DeFi accessible.", votes: 4 },
            { user: "do.kwon@gmail.com", text: "DeFi needs more stability (RIP LUNA).", votes: -4 }
        ],
        "DAO": [
            { user: "aragon@gmail.com", text: "DAOs are the future of organizations.", votes: 5 },
            { user: "molochdao@gmail.com", text: "Moloch DAO is funding public goods.", votes: 3 },
            { user: "thedao@gmail.com", text: "We tried... it didn't go well.", votes: -6 }
        ]
    };

    function createWordCard(word, definitionData) {
        const card = $("<div>").addClass("word-card");
        const title = $("<h2>").addClass("word-title").text(word);
        const definition = $("<p>").text(definitionData.definition);
        const exampleUsage = $("<div>").addClass("example-usage");
        const exampleTitle = $("<h3>").text("Example Usage");
        const example = $("<p>").text(definitionData.example);
        exampleUsage.append(exampleTitle, example);

        // Blacklight Divider
        const divider = $("<hr>");


        const voteArea = $("<div>").attr("id", "vote-area");
        const upvoteButton = $("<button>").attr("id", "upvote-button").text("Upvote");
        const upvoteCountSpan = $("<span>").attr("id", "upvote-count").text(0);
        const downvoteButton = $("<button>").attr("id", "downvote-button").text("Downvote");
        const downvoteCountSpan = $("<span>").attr("id", "downvote-count").text(0);
        voteArea.append(upvoteButton, upvoteCountSpan, downvoteButton, downvoteCountSpan);

        const commentArea = $("<div>").addClass("comment-area");
        const commentTitle = $("<h2>").text("Top Comments");
        const commentList = $("<div>").addClass("comment-list");
        const commentInput = $("<textarea>").attr("id", "comment-input").attr("placeholder", "Add your comment (login required)");
        const commentButton = $("<button>").attr("id", "comment-button").text("Post Comment");
        commentArea.append(commentTitle, commentList, commentInput, commentButton);

        // Load Top Comments
        loadTopComments(word, commentList);

        card.append(title, definition, exampleUsage, divider, voteArea, commentArea);

        upvoteButton.click(function() {
            handleUpvote(word);
        });

        downvoteButton.click(function() {
            handleDownvote(word);
        });

        commentButton.click(function() {
           handleComment(word);
        });

        return card;
    }
    
    function handleUpvote(word) {
        if (!isLoggedIn) {
            alert("You must be logged in to vote.");
            return;
        }

        if (userVotes[word] === 'upvoted') {
            alert("You have already upvoted this.");
            return;
        }
        
        let card = $(`div.word-card:contains(${word})`);
        if(card){
           let upvoteCountSpan = card.find("#upvote-count")
           let upvoteCount = parseInt(upvoteCountSpan.text())
           upvoteCount += 1;
           upvoteCountSpan.text(upvoteCount)
        }
        userVotes[word] = 'upvoted';
    }

    function handleDownvote(word) {
        if (!isLoggedIn) {
            alert("You must be logged in to vote.");
            return;
        }
         if (userVotes[word] === 'downvoted') {
            alert("You have already downvoted this.");
            return;
        }

        let card = $(`div.word-card:contains(${word})`);
        if(card){
           let downvoteCountSpan = card.find("#downvote-count")
           let downvoteCount = parseInt(downvoteCountSpan.text())
           downvoteCount += 1;
           downvoteCountSpan.text(downvoteCount)
        }
        userVotes[word] = 'downvoted';
    }

    function handleComment(word) {
         if (!isLoggedIn) {
            alert("You must log in to post a comment.");
            return;
        }

        let card = $(`div.word-card:contains(${word})`);
        if(card){
            let commentInput = card.find("#comment-input");
            let commentList = card.find(".comment-list");

            const commentText = commentInput.val();
            if (commentText.trim() !== "") {
                const commentElement = createCommentElement(userEmail, commentText, 0);
                commentList.append(commentElement);
                commentInput.val("");
            }
        }
    }

    function createCommentElement(user, text, votes) {
        const commentDiv = $("<div>").addClass("comment");
        const userSpan = $("<span>").addClass("comment-user").text(user + ": ");
        const textP = $("<p>").addClass("comment-text").text(text);
        const voteArea = $("<div>").addClass("comment-vote-area");
        const upvoteButton = $("<button>").addClass("comment-vote-button").text("Upvote");
        const downvoteButton = $("<button>").addClass("comment-vote-button").text("Downvote");
        const scoreSpan = $("<span>").addClass("comment-score").text(votes);

        voteArea.append(upvoteButton, scoreSpan, downvoteButton);
        commentDiv.append(userSpan, textP, voteArea);

        return commentDiv;
    }

    function loadTopComments(word, commentList) {
        if (comments[word]) {
            // Sort comments by votes (descending)
            const sortedComments = comments[word].sort((a, b) => b.votes - a.votes);

            // Display top 3 comments
            for (let i = 0; i < Math.min(3, sortedComments.length); i++) {
                const comment = sortedComments[i];
                const commentElement = createCommentElement(comment.user, comment.text, comment.votes);
                commentList.append(commentElement);
            }
        } else {
            commentList.append($("<p>").text("No comments yet."));
        }
    }

    const main = $("main");
    let cardCount = 0;
    for (const word in definitions) {
        const card = createWordCard(word, definitions[word]);
        main.append(card);
        cardCount++;
    }

    // Update card count in the banner
    $("#card-count").text(cardCount);


    function initializeGoogleSignIn() {
        if (typeof google !== 'undefined' && google.accounts) {
            google.accounts.id.initialize({
                client_id: "YOUR_GOOGLE_CLIENT_ID",
                callback: handleCredentialResponse
            });
            google.accounts.id.renderButton(
                document.getElementById("login-button"),
                { theme: "outline", size: "large" }
            );
            google.accounts.id.prompt();
        } else {
            console.error("Google Sign-In library not loaded.");
        }
    }

    function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        alert('Logged in successfully! (Token in console)');
        isLoggedIn = true;

        const jwt = response.credential;
        // Decode the JWT token (be careful with this on the client-side)
        const decodedJwt = JSON.parse(atob(jwt.split('.')[1]));

        // Extract user info
        userEmail = decodedJwt.email; //Google email address
    }

    window.onload = function () {
        initializeGoogleSignIn();
    }
});