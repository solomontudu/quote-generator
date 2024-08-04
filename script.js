// let apiQuotes = [];
const newQuoteBtn = document.getElementById("new-quote");
const author = document.getElementById("author");
const quoteText = document.getElementById("quote");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");
const quoteContainer = document.getElementById("quote-container");

let quoteApi = [];

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading
function stopLoading() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// show new quote
function newQuote() {
  loading();
  // pick a randon quote from apiQuotes array
  const quote = quoteApi[Math.floor(Math.random() * quoteApi.length)];

  if (quote) stopLoading();

  const writer = quote.author == "type.fit" ? "unknown" : quote.author.split(",")[0];

  author.textContent = writer;

  // check quote length to determine styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
}

// tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
  window.open(twitterUrl, "_blank");
}

// on load
document.addEventListener("DOMContentLoaded", newQuote);

// get quotes from API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    if (response.ok) stopLoading();

    quoteApi = await response.json();
    newQuote();
  } catch (error) {
    // catch error here
    console.log(error);
  }
}

// on load
getQuotes();
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
