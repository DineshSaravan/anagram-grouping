import { startCLI } from './cli';
import readline, { Interface } from 'readline';

describe("cli", () => {
  describe("start command line interface", () => {
    it("should return cli object", () => {
      const cli = startCLI();
      expect(cli).not.toBeUndefined();
      cli.close();
    });
  });

  describe("question", () => {
    it("should call readline.question with text", () => {
      const mockReadLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      mockReadLine.question = jest.fn();
      const cli = startCLI(mockReadLine as Interface);

      const text = "Enter path of the file: ";
      cli.question(text);
      expect(mockReadLine.question).toBeCalledWith(text, expect.any(Function));
    });
  });
});
