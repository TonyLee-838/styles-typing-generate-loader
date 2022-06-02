export const classnameMatcher = /(?<=\.)[a-z-_][\da-z-_]*/gi;

export function findUniqueClassnames(source: string): string[] {
  source.split(/[\{\}]/);
  return Array.from(new Set(source.match(classnameMatcher)));
}

export function parseClassname(classname: string): string {
  return classname.includes("-")
    ? `"${classname}"|"${kebabCaseToCamelCase(classname)}"`
    : `"${classname}"`;
}

export function generateTsCode(uniqueClassnames: string[]): string {
  const parsedClassnames = uniqueClassnames.map(parseClassname);

  return `
type classnames = ${parsedClassnames.join("|")};
const styles: {
  [k in classnames]: string;
};
export = styles;`;
}

export function kebabCaseToCamelCase(key: string) {
  const splitted = key.split("-");

  return splitted
    .map((word, index) => {
      if (!index) return word;

      return word[0].toUpperCase() + word.slice(1);
    })
    .join("");
}
