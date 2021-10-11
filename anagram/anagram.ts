// import { readLineByLine } from '../services/file.service';
import fs from 'fs';
import readline from 'readline';

/* Anagram groups data
   key - alphabetised word for a anagram group
   value - Set of words matching anagram groups (Used Set<string> which doesn't allow duplicates)
   */
let anagrams: Map<string, Set<string>> = new Map<string, Set<string>>();

export async function groupAnagramsFromFile(filePath: string) {

  await readLineByLine(filePath, (word) => {
    const alphabetisedKey: string = wordFormat(word)
        .split('')
        .sort()
        .join('');

    if (anagrams.has(alphabetisedKey)) {
      anagrams.get(alphabetisedKey).add(wordFormat(word));
    } else {
      anagrams.set(alphabetisedKey, new Set<string>().add(wordFormat(word)));
    }
  });
}

// get line count for file
let lineCount = 0;
export async function readLineByLine(path: string, cb: (line: string) => void) {
  if (!fs.existsSync(path)) {
    console.error(`Invalid file path, file does not exist.`);
    process.exit(1);
  }

  const fileStream = fs.createReadStream(path);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  rl.on('line', function (line) {
    // increment line count on every line read
    lineCount++;

    // callback function with line read value (word)
    cb(line);
  });

  rl.on('close', function () {
    printAnagramGroups();
    // print linecount of file
    console.log("Total number of lines in file: ", lineCount);
  });
}

export function wordFormat(word: string): string {
  // lower case all characters of word and remove white space if any exist
  return word.toLowerCase()
      .replace(/\s/g, "");
}

function printAnagramGroups(): void {
  anagrams.forEach((value: Set<string>, keyIgnored: string) => {
    // printing out in console grouped anagram words
    let anagramGroupText: string = Array.from(value).join(', ');
    console.log(anagramGroupText);
  });
}
