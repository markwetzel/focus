export const kebabCaseToCamelCase = (kebabCaseValue: string) =>
  kebabCaseValue
    .split('-')
    .map((separatedValue, index) => {
      return index === 0
        ? separatedValue
        : separatedValue.charAt(0).toUpperCase() +
            separatedValue.substr(1, separatedValue.length - 1);
    })
    .join('');
