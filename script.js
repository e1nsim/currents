async function analyzeSentiment() {
    var textInput = document.getElementById("input-text").value;
    var wordsArray = textInput.split(" ");
    // console.log("Words Array:", wordsArray);

    var emotionResults = [];

    // Iterate over each word and analyze its emotion
    for (var i = 0; i < wordsArray.length; i++) {
        var word = wordsArray[i];
        // Analyze emotion for the current word and await the result
        var emotionResult = await analyzeWordEmotion(word);
        emotionResults.push(emotionResult);
    }

    // console.log("Emotion Results:", emotionResults);
    displayAnalyzedText(wordsArray, emotionResults);
}

async function analyzeWordEmotion(word) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("apikey", "EG5DYzcCwMw4ra6yO55sn5QLAG7IZKcR");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "text": word });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        // Fetch the emotion analysis and await the response
        var response = await fetch("https://api.apilayer.com/text_to_emotion", requestOptions);
        if (!response.ok) {
            throw new Error('Failed to analyze emotion: ' + response.status);
        }

        var result = await response.json();
        return result;
    } catch (error) {
        console.error('Error analyzing emotion:', error);
        return null; // Return null or a default value in case of error
    }
}

// Function to display the analyzed text on the webpage with emotion-based styling
function displayAnalyzedText(wordsArray, emotionResults) {
    var resultsContainer = document.getElementById("results");
    for (var i = 0; i < wordsArray.length; i++) {
        var word = wordsArray[i];
        var emotionResult = emotionResults[i];
    
        // Check if the emotionResult is not null
        if (emotionResult) {
            var score = emotionResult.score;
            var typographyStyle = "";
    
            // Apply styling based on emotion and its score
            if (emotionResult.Happy > 0) {
                typographyStyle += "font-size: 2em; color: yellow; text-shadow: -1px -1px 0 orange, 1px -1px 0 orange, -1px 1px 0 orange, 1px 1px 0 orange; text-transform: uppercase; font-weight: bold;";
                typographyStyle += "animation: spin 0.5s infinite;";
            }
            if (emotionResult.Sad > 0) {
                typographyStyle += "font-size: .75em; color: blue; letter-spacing: 3px;";
                typographyStyle += "animation: fall 5s infinite;";

            }
            if (emotionResult.Angry > 0) {
                typographyStyle += "font-size: 3em; font-style: italic; color: red; font-weight: bold;";
                typographyStyle += "animation: flash 0.5s infinite;";
            }
            if (emotionResult.Surprise > 0) {
                var randomColor = getRandomColor();
                var randomSize = getRandomSize();
                var randomStyle = getRandomStyle();
                typographyStyle += "color: " + randomColor + ";";
                typographyStyle += "font-size: " + randomSize + "px;";
                typographyStyle += "font-style: " + randomStyle + ";";
            }
            if (emotionResult.Fear > 0) {
                typographyStyle += "color: green; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);";
                typographyStyle += "animation: tremble 0.5s linear infinite;";
            }

            console.log(emotionResult)
    
            // Create a span element for the word with styled typography
            var wordSpan = document.createElement("span");
            wordSpan.textContent = word;
    
            // Apply typography style
            wordSpan.style.cssText = typographyStyle;
    
            // // Add animation event listeners to the word span
            // wordSpan.addEventListener("animationstart", function(event) {
            //     console.log("Animation started for word:", event.target.textContent);
            // });
            // wordSpan.addEventListener("animationiteration", function(event) {
            //     console.log("Animation iteration for word:", event.target.textContent);
            // });
            // wordSpan.addEventListener("animationend", function(event) {
            //     console.log("Animation ended for word:", event.target.textContent);
            // });
    
            // Append the word span to the container
            resultsContainer.appendChild(wordSpan);
            resultsContainer.appendChild(document.createTextNode(" "));
        } else {
            // If emotion analysis failed for the word, simply display it without styling
            resultsContainer.appendChild(document.createTextNode(word + " "));
        }
    }
}

function getRandomSize() {
    return Math.floor(Math.random() * 20) + 20; // Generates a random size between 10 and 29
}

function getRandomStyle() {
    var styles = [
        'normal', 'italic', 'oblique', // Font styles
        'normal bold', 'normal bolder', 'normal lighter', // Font weights
        'underline', 'overline', 'line-through', // Text decorations
        'normal italic bold', 'italic bold', 'oblique bold' // Combined styles
    ];
    return styles[Math.floor(Math.random() * styles.length)];
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Add event listener to the clear button
document.getElementById("clear").addEventListener("click", clearResults);

// Function to clear the results box
function clearResults() {
    var resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";
}
