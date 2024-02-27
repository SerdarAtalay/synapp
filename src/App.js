import './App.scss';
import { useState, useEffect } from "react";

function App() {
    const [input, setInput] = useState('');
    const [translation, setTranslation] = useState('');
    const [history, setHistory] = useState([]);

    const addToHistory = (newInput, newTranslation) => {
        const newHistoryItem = { input: newInput, translation: newTranslation };
        setHistory(prevHistory => [...prevHistory, newHistoryItem]);
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleTranslate = async () => {
        if (!input) return;
        let query = `https://api.mymemory.translated.net/get?q=${input}&langpair=en|tr`;
        fetch(query)
            .then(response => response.json())
            .then(data => {
                setTranslation(data.responseData.translatedText);
                addToHistory(input, data.responseData.translatedText);
            });
    };

    const handleSpeechRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.start();
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
        };
    };

    return (
        <div className="App">
            <div className="input-output">
                <div className="input-field">
                    <button className="voice-btn" onClick={handleSpeechRecognition} >🎙</button>
                    <input className="text-input" type="text" value={input} onChange={handleInputChange}
                           placeholder="Enter text here..."/>
                </div>
                <output className="translation-output">{translation}</output>
            </div>
            <button className="translate-btn" onClick={handleTranslate}>Translate</button>
            <div className="history">
                <h2>History</h2>
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>
                            <strong>Input:</strong> {item.input} <br />
                            <strong>Translation:</strong> {item.translation}
                        </li>
                    ))}
                </ul>
                <button className="clear-history-btn" onClick={() => setHistory([])}>Clear History</button>
            </div>
        </div>
    );
}

export default App;
