"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
describe("generateTsCode", () => {
    it("can generate ts code properly", () => {
        const uniqueClassname = ["icon", "title", "label-icon", "bannerImage"];
        const result = (0, utils_1.generateTsCode)(uniqueClassname);
        expect(result).toBe(`
type classnames = \"icon\"|\"title\"|\"label-icon\"|\"labelIcon\"|\"bannerImage\";
const styles: {
  [k in classnames]: string;
};
export = styles;`);
    });
});
describe("parseClassname", () => {
    it("takes classnames with only one word", () => {
        const classname = "icon";
        expect((0, utils_1.parseClassname)(classname)).toBe('"icon"');
    });
    it("takes classnames in camel case", () => {
        const classname = "iconName";
        expect((0, utils_1.parseClassname)(classname)).toBe('"iconName"');
    });
    it("takes classnames in kebab case", () => {
        const classname = "icon-name";
        expect((0, utils_1.parseClassname)(classname)).toBe('"icon-name"|"iconName"');
    });
    it("takes classnames in kebab case with digits", () => {
        const classname = "icon-name-2";
        const classname2 = "icon-name2-2";
        expect((0, utils_1.parseClassname)(classname)).toBe('"icon-name-2"|"iconName2"');
        expect((0, utils_1.parseClassname)(classname2)).toBe('"icon-name2-2"|"iconName22"');
    });
});
describe("function findUniqueClassnames", () => {
    it("tests simple css stylesheet definitions", () => {
        const styleSheetCode = `
    .icon {
      width:12px;
    }
    `;
        const result = (0, utils_1.findUniqueClassnames)(styleSheetCode);
        expect(result).toMatchObject(["icon"]);
    });
    it("tests classname with '.' in the value", () => {
        const styleSheetCode = `
    .icon {
      width:12.5px;
    }
    `;
        const result = (0, utils_1.findUniqueClassnames)(styleSheetCode);
        expect(result).toMatchObject(["icon"]);
    });
    it("tests classname classname with more than one level", () => {
        const styleSheetCode = `
    .icon .icon2 {
      width:12.5px;
    }
    `;
        const result = (0, utils_1.findUniqueClassnames)(styleSheetCode);
        expect(result).toMatchObject(["icon", "icon2"]);
    });
    it("tests multiple classnames with same name", () => {
        const styleSheetCode = `
    .icon {
      width:12.5px;
    }
    .icon {
      width:13px;
    }
    `;
        const result = (0, utils_1.findUniqueClassnames)(styleSheetCode);
        expect(result).toMatchObject(["icon"]);
    });
    it("tests classname classname with nested classname", () => {
        const styleSheetCode = `
    .icon {
      .icon2 {
        width:12.5px;  
      }
      width:12.5px;
    }
    `;
        const result = (0, utils_1.findUniqueClassnames)(styleSheetCode);
        expect(result).toMatchObject(["icon", "icon2"]);
    });
});
describe("kebabCaseToCamelCase", () => {
    it("tests one word", () => {
        const key1 = "abc";
        const key2 = "a";
        expect((0, utils_1.kebabCaseToCamelCase)(key1)).toBe(key1);
        expect((0, utils_1.kebabCaseToCamelCase)(key2)).toBe(key2);
    });
    it("tests multiple words", () => {
        const key = "it-should-be-ok";
        expect((0, utils_1.kebabCaseToCamelCase)(key)).toBe("itShouldBeOk");
    });
    it("tests empty string", () => {
        const key = "";
        expect((0, utils_1.kebabCaseToCamelCase)(key)).toBe("");
    });
    it("tests contains number", () => {
        const key = "a1-word2-3word";
        expect((0, utils_1.kebabCaseToCamelCase)(key)).toBe("a1Word23word");
    });
});
