import './App.scss';
import { useState, useEffect } from "react";
import {useTranslation} from "./hooks/useTranslation";

function App() {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const {translationObject} = useTranslation({textToTranslate: input, debounceTime: 1000});

    useEffect(() => {
        if (!translationObject.translatedText) {
            return;
        }
        addToHistory(translationObject.textToTranslate, translationObject.translatedText);
    }, [translationObject.translatedText])

    const addToHistory = (newInput, newTranslation) => {
        const newHistoryItem = { input: newInput, translation: newTranslation };
        setHistory(prevHistory => [...prevHistory, newHistoryItem]);
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
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
                <output className="translation-output">{translationObject.translatedText}</output>
            </div>

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
