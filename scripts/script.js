import words from '../testData/koreanWords.js';
let maximumTests = words.length;
localStorage.clear();
const testSection = document.querySelector('#Tests');
const check = document.querySelector('#check');

const p = (content) => {
    const p = document.createElement('p');
    if(!content.startsWith('translate to:')) p.classList.add("center");
    p.innerHTML = content;
    return p;
}

const input = (number) => {
    const input = document.createElement('input');
    input.classList.add(number);
    return input;
}

const randomNumber = (min, max) => { 
    return Math.floor(Math.random() * (max - min + 1) + min);
} 

const div = (data, rndmNum, num) => {
    let languageToTranslate;
    let languageFromTranslate; 
    let rndmNumForToTranslate;
    let description = 'translate to: ';

    do{
        if(rndmNum < 250)
        {
            languageFromTranslate = 0;
        }
        else if(rndmNum < 500 && rndmNum > 249)
        {
            languageFromTranslate = 1;
        }
        else if(rndmNum < 750 && rndmNum > 499)
        {
            languageFromTranslate = 2;    
        }
        else if(rndmNum > 749)
        {
            languageFromTranslate = 3;        
        }
        rndmNumForToTranslate = randomNumber(1, 1000);
        if(rndmNumForToTranslate < 250)
        {
            languageToTranslate = 3;
        }
        else if(rndmNumForToTranslate < 500 && rndmNumForToTranslate > 249)
        {
            languageToTranslate = 2;
        }
        else if(rndmNumForToTranslate < 750 && rndmNumForToTranslate > 499)
        {
            languageToTranslate = 1;    
        }
        else if(rndmNumForToTranslate > 749)
        {
            languageToTranslate = 0;        
        } 
    }while(languageFromTranslate === languageToTranslate)

    description += data["languages"][languageToTranslate];
    localStorage.setItem(num, data[data["languages"][languageToTranslate]])
    const createDiv = document.createElement('div');
    createDiv.id = 'word'; 
    const descriptionP = p(description);
    const word = p(data[data["languages"][languageFromTranslate]]);
    const inputField = input(num);
    createDiv.classList.add(`test${num}`, num);
    createDiv.append(descriptionP);
    createDiv.append(word);
    createDiv.append(inputField);

    return createDiv;
}

const extractNumber = (word) => Number(word.split(' ')[1]);


const maximumCount = document.querySelector('#maximumCount');
let elementCount = 0;
const chosenWords = [];
const sortArr = arr => {
    for(let i = 0; i < arr.length; ++i)
    {
        for(let j = i; j < arr.length; ++j)
        {
            if(arr[i] < arr[j])
            {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
    }
}
const numExists = (arr, searchFor) => {
    for(let i = 0; i < arr.length; ++i)
    {
        if(searchFor === arr[i]) return true
    }
    return false;
}

check.addEventListener('click', () => {
const testResults = testSection.querySelectorAll('#word');
let correctCount = 0;

testResults.forEach(element => {
    element.classList.remove('correct', 'wrong');
    const num = extractNumber(element.classList.value);
    const getResult = localStorage.getItem(num).toLowerCase();
    const getInput = element.querySelector('input').value.toLowerCase();
    if(getResult === getInput)
    {
        ++correctCount;
        element.classList.add('correct');
    }
    if(getResult !== getInput)
    {
        element.classList.add('wrong');
    }
});
const correctCountP = document.querySelector('#correctCount');
correctCountP.innerText = correctCount;
})
maximumCount.innerText = maximumTests;

for(let i = 0; i < maximumTests; ++i)
{
    const rndmNum = randomNumber(1, 1000);
    let rndmTest = randomNumber(1, 11);
    do{
        rndmTest = randomNumber(1, 11);
        sortArr(chosenWords);
        let test = div(words[`word ${rndmTest}`], rndmNum, rndmTest);
        if(!numExists(chosenWords, rndmTest))
        {
            chosenWords.push(rndmTest);
            localStorage.setItem(rndmTest, words[`word ${rndmTest}`]);
            test = div(words[`word ${rndmTest}`], rndmNum, rndmTest);
        }
        testSection.append(test);
    }while(!numExists(chosenWords, rndmTest))

}