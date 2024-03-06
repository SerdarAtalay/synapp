import {useEffect, useState} from 'react'

export const useTranslation= ({textToTranslate, debounceTime = 618, isAudio}) => {
    const [translatedText, setTranslatedText] = useState('')

    useEffect(() => {
        if (!textToTranslate) {
            setTranslatedText('');
            return;
        }
        const timeout = setTimeout(() => {
            translate();
        }, debounceTime);
        return () => clearTimeout(timeout);
    }, [textToTranslate]);

    const translate = () => {

        let query = `https://api.mymemory.translated.net/get?q=${textToTranslate}&langpair=en|tr`;
        fetch(query)
            .then(response => response.json())
            .then(data => {
                setTranslatedText(data.responseData.translatedText);
            });
    }
    return {
        translationObject:{textToTranslate, translatedText, isAudio}
    }
}