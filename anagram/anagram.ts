import fs from 'fs';
import readline from 'readline';
import eventStream from 'event-stream';

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

  // Start - time calculation of file read
  console.time('File read time:');

  /*
  * Event-stream method to fetch contents from file
  * */
  const fileStream = fs.createReadStream(path);
  fileStream
      .pipe(eventStream.split())
      .pipe(eventStream
          .mapSync(function(line) {
            lineCount++;
            cb(line);
          }))
      .on('error', function(err) {
        console.error('Error while reading file.', err);
        process.exit(1);
      })
      .on('end', function () {
        onFileReadCloseAction();
      });

  /*
  * Readline - code implementation
  * Added experiment details in Readme.md
  /*
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
    onFileReadCloseAction();
  });
   */
}

export function wordFormat(word: string): string {
  // lower case all characters of word and remove white space if any exist
  return word.toLowerCase()
      .replace(/\s/g, "");
}

function printAnagramGroups(): void {
    console.log("-----ANAGRAM GROUPS-----");
  anagrams.forEach((value: Set<string>) => {
    // printing out in console grouped anagram words
    let anagramGroupText: string = Array.from(value).join(', ');
    console.log(anagramGroupText);
  });
}

function printStats(): void {
    // File read performance stats
    console.timeEnd('File read time:');  // End - time calculation of file read
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Memory used approximately : ${Math.round(used * 100) / 100} MB`);
    console.log("Total number of lines in file: ", lineCount);
}

function onFileReadCloseAction(): void {
  printAnagramGroups();
  printStats();
}
