const fs = require('fs');

const removingword = fs.readFileSync('exclude-words.txt', 'utf8').split(/\s+/);
const wordCount = {};
for (let i = 1; i <= 3; i++) {
  const pageContent = fs.readFileSync(`Page${i}.txt`, 'utf8');
  const pageWords = pageContent.toLowerCase().split(/\W+/);
  
  for (let j = 0; j < pageWords.length; j++) {
    const word = pageWords[j];
    if (!removingword.includes(word)) {
      if (!wordCount[word]) {
        wordCount[word] = [i];
      } else {
        if (!wordCount[word].includes(i)) {
          wordCount[word].push(i);
        }
      }
    }
  }
}

const sortedWords = Object.keys(wordCount).sort();

const indexFile = fs.createWriteStream('index.txt');
for (let i = 0; i < sortedWords.length; i++) {
  const word = sortedWords[i];
  const pageNumbers = wordCount[word].join(',');
  indexFile.write(`${word} : ${pageNumbers}\n`);
}
indexFile.end();
