import { startCLI } from './cli';
import { groupAnagramsFromFile } from './anagram';

(async () => {
    const cli = startCLI();

    await getFilePath();

    async function getFilePath() {
        const filePath: string = await cli.question("Enter the path of the file to group anagrams: ");

        // check filename extension is .txt
        if (filePath.split('.').pop() !== 'txt') {
            console.error('Invalid file extension!');
            process.exit(1);
        }

        await groupAnagramsFromFile(filePath);
        cli.close();
    }
})();
