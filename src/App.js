import './App.scss';
import {useState} from "react";

function App() {
    const [input, setInput] = useState('');
    const [translation, setTranslation] = useState('');

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleTranslate = async () => {
        let query = `https://api.mymemory.translated.net/get?q=${input}&langpair=en|tr`;
        fetch(query).then(response => response.json()).then(data => setTranslation(data.responseData.translatedText));
    };

    const handleSpeechRecognition = () =>{
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.start();
        recognition.onresult = (event) => {
            setInput(event.results[0][0].transcript);
            handleTranslate();
        }
    }

    return (
    <div className="App">
        <input type="text" value={input} onChange={handleInputChange}/>
        <p>{input.toString()}</p>
        <button onClick={handleTranslate}>Translate</button>
        <button onClick={handleSpeechRecognition}>Voice Input</button>
        <p>{translation.toString()}</p>
    </div>
  );
}

export default App;
