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

  return (
    <div className="App">
        <input type="text" value={input} onChange={handleInputChange}/>
        <p>{input}</p>
        <button onClick={handleTranslate}>Translate</button>
        <p>{translation}</p>
    </div>
  );
}

export default App;
