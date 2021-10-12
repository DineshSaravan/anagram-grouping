<h1 align="center">Anagrams Grouping</h1>
<div align= "center">
  <h4>This program takes as argument the path to a .txt file containing one word per line, groups the words 
    that are anagrams to each other and writes to the standard output each of the groups separated
    by new lines and the words inside each group by commas. </h4>
</div>

<h3>Sample Output</h3>
<p align="center">
  <img src="https://github.com/DineshSaravan/anagram-grouping/blob/master/sample-output.png">
</p>

## :pen: Language used
```
Typescript
```

## 🚀&nbsp; Installation

#### Clone the repo
```
$ git clone https://github.com/DineshSaravan/anagram-grouping.git
```

## :mag: Prerequisites
#### Packages
Before attempting to use run this application locally, make sure you have the following
installed:
- [Node LTS](https://nodejs.org/en/download/) - Node version > 10 (Recommended: version "Fermium"`14.17.2`)
- [Yarn](https://yarnpkg.com/)

## :wrench: Run Application
After installing pre-requisites, in your terminal, run the below command from the root directory of this project

```sh
yarn install
yarn start
```

On running above command, it triggers the CLI (command line interface) and prompts a message in terminal 
for you to enter the path of the file, something like below: 

```console
foo@bar:~$ yarn start
$ tsc && node dist/index.js
Enter the path of the file to group anagrams: _
```

Now in the terminal prompt, enter the path to the file which you would like to group anagrams from 
the file context containing one word per line format. 

```console
Enter the path of the file to group anagrams: ./data/example1.txt
```

After entering the path to the file in command prompt, press enter to process the anagram grouping. 
If valid path to a file is provided, then the output would be something similar to below:

```text
Enter the path of the file to group anagrams: ./data/example1.txt
-----ANAGRAM GROUPS-----
abc, bac, cba
fun, unf
hello
File read time:: 6.239ms
Memory used approximately : 2.52 MB
Total number of lines in file:  7

```

### Data Structure used
```typescript
let anagrams = new Map<string, Set<string>>();
```
Used HashMap to store groups of anagrams data read from the file.
* @key ```string``` - Alphabetised word for each anagram group is stored as key.
* @value ```Set<string>``` - To store multiple anagram words mapped to a singe key group, I used ```Set``` data structure which supports our requirement by storing only unique anagram words to a group and in a specified order.

### Big O Analysis
* Time Complexity: O(N K log K), where N is the length of words from file, and K is the maximum
length of a word in file. File reading contents has the complexity of O(N) and as we iterate through
each word. Then, we sort each string in O(K log K) time.
* Space Complexity: O(N), total words printed out in output

### Future improvements
On given more time, I would improve this project by:
* Add a client UI to upload a file and generate the anagram groups by displaying the groups data in table view format.
* Improvised deployment strategy to deploy application in docker container and attach automated tests using CI pipeline.
* Add logging configurations to track file data contexts (eg: invalid words in the file can be skipped and added in the logs along with count).
* Performance improvements on huge file data. Also add metrics to visualise in graphs to monitor time, heap and memory usages.

## Experiments
I performed two experiments on reading the file contents using below methods to monitor the performance
of reading contents from file in order to support huge data file for processing anagram groups. 

In addition to the datasets provided as part of assignment, I also tested the program with one of 
the public available large dataset size of 32.9MB to monitor the performance. [example3.txt](/data/example3.txt).

* readline
```typescript
const fileStream = fs.createReadStream(filePath);
const readline = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  readline.on('line', function (line) {
    // do something on reading each line from the file
  });

  readline.on('close', function () {
    // do something after finish reading data from file
  });
```

* event-stream
```typescript
const fileStream = fs.createReadStream(filePath);
  fileStream
      .pipe(eventStream.split())
      .pipe(eventStream
          .mapSync(function(line) {
              // do something on reading each line from the file
          }))
      .on('error', function(err) {
        console.error('Error while reading file.', err);
        process.exit(1);
      })
      .on('end', function () {
          // do something after finish reading data from file
      })
```

As a result of the experiment on testing with three different [datasets](/data) of different sizes, 
both method implementation stated above successfully executed and the performance were almost same on 
both implementation. One of the experiments results is show below, where data presented is appropriate for both method implementation.

| FileName | File Size | File ReadTime | Memory Used | File linesCount
| --- | --- | --- | --- | --- |
| [example1.txt](/data/example1.txt) | 4 KB | 4.063ms | 3.2 MB | 7
| [example2.txt](/data/example2.txt) | 1.7 MB | 4.308s | 61.25 MB | 172823
| [example3.txt](/data/example3.txt) | 32.9 MB| 55.556s | 540.26 MB | 3468996


## Running tests  
In terminal, change directory to root directory of this project and run below command to run tests
```sh
yarn test
```

## :heart: Contributor
Made by [Dinesh Sarvan](https://github.com/DineshSaravan)
