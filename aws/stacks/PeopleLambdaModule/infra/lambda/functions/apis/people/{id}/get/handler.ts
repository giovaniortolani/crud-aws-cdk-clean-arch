import { DynamoDB } from 'aws-sdk';
const ddbClient = new DynamoDB.DocumentClient();

const tableName = 'People';

exports.handler = async (event) => {
  try {
    const id = event.pathParameters.id;

    const missingParameters = verifyRequiredParameters({ id });
    if (missingParameters) {
      return { statusCode: 400, body: JSON.stringify({ message: `${missingParameters} required` }) };
    }

    const people = (await getPerson(id)).Item;

    // Dicas do Peixe
    // > 204 quando não tiver resultado. Ex: não encontrar o usuário etc.
    // > Not Found 404 quando o conjunto do path não existe na sua aplicação.

    if (!people) {
      return { statusCode: 204 };
    }

    return { statusCode: 200, body: JSON.stringify(people) };
  } catch (exception) {
    console.error(exception);

    return { statusCode: 500, body: JSON.stringify({ message: 'Internal Server Error' }) };
  }
};

const getPerson = async (id) => {
  /* Outra forma de fazer */
  // return await ddbClient.query({
  //   TableName: tableName,
  //   ExpressionAttributeValues: { ':id': id },
  //   KeyConditionExpression: 'id = :id',
  //   Limit: '1'
  // }).promise();
  return await ddbClient
    .get({
      TableName: tableName,
      Key: { id: id },
    })
    .promise();
};

const verifyRequiredParameters = (parameters) => {
  const requiredParameters = ['id'];
  let missingParameters = [];
  missingParameters = requiredParameters.filter((requiredParameter) => parameters[requiredParameter] === undefined);

  return missingParameters.length ? missingParameters.join(', ') : '';
};
