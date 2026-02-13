const fromText = document.querySelector("#from-text");
const toText = document.querySelector("#to-text");
const translateBtn = document.querySelector("#translate-btn");
const copyBtn = document.querySelector("#copy-btn");
const swapBtn = document.querySelector("#swap-btn");
const sourceLang = document.querySelector("#source-lang");
const targetLang = document.querySelector("#to-lang");

// Function to call API
translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim();
    let translateFrom = sourceLang.value; 
    let translateTo = targetLang.value;

    if(!text) return;

    toText.placeholder = "Translating...";

    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText;
            toText.placeholder = "Translation";
        })
        .catch(error => {
            console.error("Error:", error);
            toText.placeholder = "Error in translation";
        });
});

// Swap Languages Feature
swapBtn.addEventListener("click", () => {
    let tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;

    let tempLang = sourceLang.value;
    sourceLang.value = targetLang.value;
    targetLang.value = tempLang;
});

// Copy Feature
copyBtn.addEventListener("click", () => {
    if(!toText.value) return;
    navigator.clipboard.writeText(toText.value);
    
    // Quick visual feedback
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = `<i class="fas fa-check"></i> Copied!`;
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
    }, 2000);
});