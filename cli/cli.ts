import readline from 'readline';

export function startCLI(rl?: readline.Interface) {
  if (!rl) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async function question(text: string): Promise<string> {
    return new Promise<string>((resolve) => {
      rl.question(text, resolve);
    });
  }

  function close() {
    rl.close();
  }

  return { question, close };
}
