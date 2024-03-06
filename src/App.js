import './App.scss';
import { useState, useEffect } from "react";
import {useTranslation} from "./hooks/useTranslation";

function App() {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const [isAudio, setIsAudio] = useState(false);
    const {translationObject} = useTranslation({textToTranslate: input, debounceTime: isAudio? 0: 618, isAudio: isAudio});

    useEffect(() => {
        if (!translationObject.translatedText) {
            return;
        }
        addToHistory(translationObject.textToTranslate, translationObject.translatedText, translationObject.isAudio);
    }, [translationObject.translatedText])

    const addToHistory = (newInput, newTranslation, isAudio) => {
        const newHistoryItem = { input: newInput, translation: newTranslation, isAudio: isAudio };
        setHistory(prevHistory => [...prevHistory, newHistoryItem]);
    };

    const handleInputChange = (event) => {
        // if handleSpeechRecognition is not used, isAudio is always false
        setIsAudio(false);
        setInput(event.target.value);
    };

    const handleSpeechRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.start();
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setIsAudio(!!transcript);
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
                            <strong>Input:</strong> {item.input}{item.isAudio ? <strong>🎙</strong> : null}
                            <br />
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
