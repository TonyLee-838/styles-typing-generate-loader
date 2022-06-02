"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kebabCaseToCamelCase = exports.generateTsCode = exports.parseClassname = exports.findUniqueClassnames = exports.classnameMatcher = void 0;
exports.classnameMatcher = /(?<=\.)[a-z-_][\da-z-_]*/gi;
function findUniqueClassnames(source) {
    source.split(/[\{\}]/);
    return Array.from(new Set(source.match(exports.classnameMatcher)));
}
exports.findUniqueClassnames = findUniqueClassnames;
function parseClassname(classname) {
    return classname.includes("-")
        ? `"${classname}"|"${kebabCaseToCamelCase(classname)}"`
        : `"${classname}"`;
}
exports.parseClassname = parseClassname;
function generateTsCode(uniqueClassnames) {
    const parsedClassnames = uniqueClassnames.map(parseClassname);
    return `
type classnames = ${parsedClassnames.join("|")};
const styles: {
  [k in classnames]: string;
};
export = styles;`;
}
exports.generateTsCode = generateTsCode;
function kebabCaseToCamelCase(key) {
    const splitted = key.split("-");
    return splitted
        .map((word, index) => {
        if (!index)
            return word;
        return word[0].toUpperCase() + word.slice(1);
    })
        .join("");
}
exports.kebabCaseToCamelCase = kebabCaseToCamelCase;
