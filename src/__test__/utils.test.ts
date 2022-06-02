import {
  kebabCaseToCamelCase,
  findUniqueClassnames,
  parseClassname,
  generateTsCode,
} from "../utils";

describe("generateTsCode", () => {
  it("can generate ts code properly", () => {
    const uniqueClassname = ["icon", "title", "label-icon", "bannerImage"];

    const result = generateTsCode(uniqueClassname);

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

    expect(parseClassname(classname)).toBe('"icon"');
  });
  it("takes classnames in camel case", () => {
    const classname = "iconName";

    expect(parseClassname(classname)).toBe('"iconName"');
  });
  it("takes classnames in kebab case", () => {
    const classname = "icon-name";

    expect(parseClassname(classname)).toBe('"icon-name"|"iconName"');
  });
  it("takes classnames in kebab case with digits", () => {
    const classname = "icon-name-2";
    const classname2 = "icon-name2-2";

    expect(parseClassname(classname)).toBe('"icon-name-2"|"iconName2"');
    expect(parseClassname(classname2)).toBe('"icon-name2-2"|"iconName22"');
  });
});

describe("function findUniqueClassnames", () => {
  it("tests simple css stylesheet definitions", () => {
    const styleSheetCode = `
    .icon {
      width:12px;
    }
    `;
    const result = findUniqueClassnames(styleSheetCode);

    expect(result).toMatchObject(["icon"]);
  });
  it("tests classname with '.' in the value", () => {
    const styleSheetCode = `
    .icon {
      width:12.5px;
    }
    `;
    const result = findUniqueClassnames(styleSheetCode);

    expect(result).toMatchObject(["icon"]);
  });
  it("tests classname classname with more than one level", () => {
    const styleSheetCode = `
    .icon .icon2 {
      width:12.5px;
    }
    `;
    const result = findUniqueClassnames(styleSheetCode);

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
    const result = findUniqueClassnames(styleSheetCode);

    expect(result).toMatchObject(["icon"]);
  });
  it("tests global classname ", () => {
    const styleSheetCode = `
    .icon2 {
      :global(.ant-design-table)
      width:12.5px;
    }
    `;
    const result = findUniqueClassnames(styleSheetCode);

    expect(result).toMatchObject(["icon2"]);
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
    const result = findUniqueClassnames(styleSheetCode);

    expect(result).toMatchObject(["icon", "icon2"]);
  });
});

describe("kebabCaseToCamelCase", () => {
  it("tests one word", () => {
    const key1 = "abc";
    const key2 = "a";

    expect(kebabCaseToCamelCase(key1)).toBe(key1);
    expect(kebabCaseToCamelCase(key2)).toBe(key2);
  });

  it("tests multiple words", () => {
    const key = "it-should-be-ok";

    expect(kebabCaseToCamelCase(key)).toBe("itShouldBeOk");
  });

  it("tests empty string", () => {
    const key = "";

    expect(kebabCaseToCamelCase(key)).toBe("");
  });
  it("tests contains number", () => {
    const key = "a1-word2-3word";

    expect(kebabCaseToCamelCase(key)).toBe("a1Word23word");
  });
});
