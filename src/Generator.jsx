import React, { useState, useCallback, useEffect } from "react";
import { jsPDF } from "jspdf";
import "./Generator.css";

function Generator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("passwords")) || [];
    setSavedPasswords(data);
  }, []);

  const getStrength = (pass) => {
    if (!pass || pass.length < 4) {
      return { level: 0, color: "#ff4444", text: "Weak" };
    }

    let score = 0;
    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 2)
      return { level: 1, color: "#ff4444", text: "Weak" };
    else if (score <= 4)
      return { level: 2, color: "#ff9800", text: "Medium" };
    else
      return { level: 3, color: "#4caf50", text: "Strong" };
  };

  const strength = getStrength(password);

  const generatePassword = useCallback(() => {
    let chars = "";

    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+{}[]<>?/-=";

    let result = "";

    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(result);
  }, [length, upper, lower, numbers, symbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    showToast("Password Copied");
  };

  const savePassword = () => {
    const updated = [password, ...savedPasswords];
    setSavedPasswords(updated);
    localStorage.setItem("passwords", JSON.stringify(updated));
    showToast("Password Saved");
  };

  const downloadTxt = () => {
    const file = new Blob([password], { type: "text/plain" });
    const element = document.createElement("a");

    element.href = URL.createObjectURL(file);
    element.download = "password.txt";
    element.click();
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text(password, 20, 20);
    doc.save("password.pdf");
  };

  return (
    <div className={darkMode ? "generator-container dark" : "generator-container"}>
      <div className="generator-card">
        <h1>Random Key Generator 🔐</h1>

        <button
          className="toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ?"☀️ Light Mode" : "🌙 Dark Mode" }
        </button>

        <div className="length-container">
          <label>Length: {length}</label>

          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        <div className="options">
          <label>
            <input
              type="checkbox"
              checked={upper}
              onChange={() => setUpper(!upper)}
            />
            Uppercase
          </label>

          <label>
            <input
              type="checkbox"
              checked={lower}
              onChange={() => setLower(!lower)}
            />
            Lowercase
          </label>

          <label>
            <input
              type="checkbox"
              checked={numbers}
              onChange={() => setNumbers(!numbers)}
            />
            Numbers
          </label>

          <label>
            <input
              type="checkbox"
              checked={symbols}
              onChange={() => setSymbols(!symbols)}
            />
            Symbols
          </label>
        </div>

        <div className="output">
          {showPassword ? password : "••••••••••••••"}
        </div>

        <div className="strength-bar">
          <div
            className="strength-fill"
            style={{
              width: `${(strength.level / 3) * 100}%`,
              backgroundColor: strength.color,
            }}
          ></div>
        </div>

        <p style={{ color: strength.color }}>
          {strength.text}
        </p>

        <div className="buttons">
          <button onClick={generatePassword}>Generate</button>
          <button onClick={copyToClipboard}>Copy</button>
          <button onClick={savePassword}>Save</button>
          <button onClick={downloadTxt}>TXT</button>
          <button onClick={downloadPDF}>PDF</button>

          <button
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {toast && <div className="toast">{toast}</div>}
      </div>
    </div>
  );
}

export default Generator;