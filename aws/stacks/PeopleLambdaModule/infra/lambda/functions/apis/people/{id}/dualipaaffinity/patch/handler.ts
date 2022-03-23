import { DynamoDB } from 'aws-sdk';
const ddbClient = new DynamoDB.DocumentClient();

const tableName = 'People';

exports.handler = async (event) => {
  try {
    const id = event.pathParameters.id;
    const { likesDuaLipa } = JSON.parse(event.body);

    const missingParameters = verifyRequiredParameters({ id, likesDuaLipa });
    if (missingParameters) {
      return { statusCode: 400, body: JSON.stringify({ message: `${missingParameters} required` }) };
    }

    const updatedDuaLipaAffinity = await updateDuaLipaAffinity({ id, likesDuaLipa });
    if (!updatedDuaLipaAffinity) {
      return { statusCode: 404, body: JSON.stringify({ message: "User doesn't exist" }) };
    }

    return { statusCode: 204 };
  } catch (exception) {
    console.error(exception);

    return { statusCode: 500, body: JSON.stringify({ message: 'Internal Server Error' }) };
  }
};

const updateDuaLipaAffinity = async ({ id, likesDuaLipa }) => {
  try {
    // Possíveis retornos
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithItems.html#:~:text=has%20no%20effect.-,UpdateItem,-The%20most%20common
    return await ddbClient
      .update({
        TableName: tableName,
        Key: { id },
        ConditionExpression: 'attribute_exists (id)',
        UpdateExpression: 'SET #likesDuaLipa = :likesDuaLipa',
        ExpressionAttributeNames: {
          '#likesDuaLipa': 'likesDuaLipa',
        },
        ExpressionAttributeValues: {
          ':likesDuaLipa': likesDuaLipa,
        },
      })
      .promise();
  } catch (exception) {
    console.error(exception);
    return false;
  }
};

const verifyRequiredParameters = (parameters) => {
  const requiredParameters = ['id', 'likesDuaLipa'];
  let missingParameters = [];
  missingParameters = requiredParameters.filter((requiredParameter) => parameters[requiredParameter] === undefined);

  return missingParameters.length ? missingParameters.join(', ') : '';
};
