export const verifyRequiredParameters = (requiredParameters: Array<string>, parameters): string => {
  let missingParameters = [];
  missingParameters = requiredParameters.filter((requiredParameter) => parameters[requiredParameter] === undefined);

  return missingParameters.length ? missingParameters.join(', ') : '';
};
