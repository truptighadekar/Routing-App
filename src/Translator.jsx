import "./Translator.css";
import { useState } from "react";

function Translator() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [language, setLanguage] = useState("mr");

  const translateText = async () => {
    if (!text.trim()) {
      alert("Please enter some text");
      return;
    }

    const url =
      "https://google-translate113.p.rapidapi.com/api/v1/translator/text";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": "YOUR_API_KEY",
        "x-rapidapi-host": "google-translate113.p.rapidapi.com",
      },
      body: JSON.stringify({
        from: "auto",
        to: language,
        text: text,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      setTranslatedText(
        result.translatedText ||
        result.translation ||
        result.trans ||
        JSON.stringify(result)
      );
    } catch (error) {
      console.error(error);
      setTranslatedText("Translation Failed!");
    }
  };

  return (
    <div className="translator-container">
      <div className="translator-card">
        <h1>🌍 Text Translator</h1>

        <textarea
          placeholder="Enter text in English..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="mr">Marathi</option>
          <option value="hi">Hindi</option>
          <option value="kn">Kannada</option>
          <option value="sa">Sanskrit</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>

        <button onClick={translateText}>
          Translate
        </button>

        <div className="output-box">
          <h3>Translated Text</h3>
          <p>{translatedText}</p>
        </div>
      </div>
    </div>
  );
}

export default Translator;