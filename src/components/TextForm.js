import React, { useState, useEffect } from "react";

function detectEmails(text) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emails = text.match(emailRegex) || [];
  return emails;
}

function findMostFrequentWords(text) {
  const words = text.split(" ");
  const frequencyMap = {};

  words.forEach((word) => {
    if (word in frequencyMap) {
      frequencyMap[word]++;
    } else {
      frequencyMap[word] = 1;
    }
  });

  let maxFrequency = 0;
  const frequentWords = [];

  for (const word in frequencyMap) {
    if (frequencyMap[word] > maxFrequency) {
      maxFrequency = frequencyMap[word];
      frequentWords.length = 0;
      frequentWords.push(word);
    } else if (frequencyMap[word] === maxFrequency) {
      frequentWords.push(word);
    }
  }

  return { frequentWords, maxFrequency };
}

export default function TextForm(props) {
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to UpperCase", "success");
  };

  const handleLowClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to LowerCase", "success");
  };
  const handleCopy = () => {
    var text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    props.showAlert("Text Copied!!", "success");
  };
  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Removed Extra Spaces", "success");
  };

  const handleClearClick = () => {
    let newText = "";
    setText(newText);
    props.showAlert("Text Cleared", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const [text, setText] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const { frequentWords, maxFrequency } = findMostFrequentWords(text);
  const frequentWordsString = frequentWords.join(", ");
  const frequentWordsCount = frequentWords.length;
  const detectedEmails = detectEmails(text);
  const emailsString = detectedEmails.join("\n");

  return (
    <>
      <div
        className="container"
        style={{
          color: props.mode === "dark" ? "white" : "black",
        }}
      >
        <h1>{props.heading}</h1>
        <div
          className="mb-3"
          style={{
            backgroundColor: props.mode === "dark" ? "grey" : "white",
          }}
        >
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
            style={{ backgroundColor: "grey", color: "white" }}
          ></textarea>
        </div>
      </div>
      <div className="container">
        <button className="btn btn-primary mx-2 " onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleLowClick}>
          Convert to Lowercase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleClearClick}>
          Clear Text
        </button>
        <button className="btn btn-primary mx-2" onClick={handleCopy}>
          Copy Text
        </button>
        <button className="btn btn-primary mx-2" onClick={handleExtraSpaces}>
          Remove Extra Space
        </button>
      </div>
      <div
        className="container"
        style={{
          color: props.mode === "dark" ? "white" : "black",
        }}
      >
        <h1>Your text summary</h1>
        <p>
          <b>
            {text.split(" ").length - 1} WORDS, {text.length} CHARACTERS
            <br />
            {0.008 * (text.split(" ").length - 1)} MINUTES to READ
            <br />
            {0.008 * 60 * (text.split(" ").length - 1)} SECONDS to READ
            <br />
            MOST FREQUENT WORDS: {frequentWordsString}
            <br />
            FREQUENCY: {text.length === 0 ? 0 : maxFrequency}
            <br />
            EMAILS: {emailsString};
            <br />
            CURRENT TIME: {currentTime}
          </b>
        </p>
        <h2>PREVIEW</h2>
        <p>{text}</p>
      </div>
    </>
  );
}
