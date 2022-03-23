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

    const personDeleted = await deletePerson(id);
    // Alternativas
    // 403 - Forbidden (ação proibida porque não existe o ID)
    // 404 - Not Found
    if (!personDeleted) {
      return { statusCode: 404, body: JSON.stringify({ message: "User doesn't exist" }) };
    }

    return { statusCode: 204 };
  } catch (exception) {
    console.error(exception);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

const deletePerson = async (id) => {
  try {
    // Possíveis retornos
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithItems.html#:~:text=after%20the%20update.-,DeleteItem,-ReturnValues%3A%20ALL_OLD
    return await ddbClient
      .delete({
        TableName: tableName,
        Key: { id },
        ConditionExpression: 'attribute_exists (id)',
      })
      .promise();
  } catch (exception) {
    return false;
  }
};

const verifyRequiredParameters = (parameters) => {
  const requiredParameters = ['id'];
  let missingParameters = [];
  missingParameters = requiredParameters.filter((requiredParameter) => parameters[requiredParameter] === undefined);

  return missingParameters.length ? missingParameters.join(', ') : '';
};
