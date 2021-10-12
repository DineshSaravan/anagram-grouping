import { wordFormat } from './anagram';

describe("Anagrams", () => {
  describe("alphabetise word for key in map", () => {
    it("should convert to lowercase", () => {
      expect(wordFormat("AAAA")).toBe("aaaa");
    });

    it("should sort alphabetically", () => {
      expect(wordFormat("cba").split('').sort().join('')).toBe("abc");
      expect(wordFormat("caB").split('').sort().join('')).toBe("abc");
    });

    it("should remove spaces", () => {
      expect(wordFormat("c ba")).toBe("cba");
    });

    it("should remove spaces and alphabetise characters of word", () => {
      expect(wordFormat("c ba").split('').sort().join('')).toBe("abc");
    });
  });
});
