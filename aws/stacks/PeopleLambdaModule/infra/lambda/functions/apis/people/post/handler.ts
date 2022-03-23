import { DynamoDB } from 'aws-sdk';
const ddbClient = new DynamoDB.DocumentClient();

const tableName = 'People';

exports.handler = async (event) => {
  try {
    const { id, name, age, likesDuaLipa } = JSON.parse(event.body);

    /*const requiredFields = ['id', 'age']
    for (const field of requiredFields) {
      if (body[field] === undefined) {
        return { statusCode: 400, body: JSON.stringify({ message: 'id and age must be supplied'}) };
      }
    }*/

    const missingParameters = verifyRequiredParameters({ id, age });
    if (missingParameters) {
      return { statusCode: 400, body: JSON.stringify({ message: `${missingParameters} required` }) };
    }

    const createdPerson = await createPerson({ id, name, age, likesDuaLipa });

    if (!createdPerson) {
      return { statusCode: 404, body: JSON.stringify({ message: 'User already exists' }) };
    }

    return { statusCode: 201, body: JSON.stringify({ id, name, age, likesDuaLipa }) };
  } catch (exception) {
    console.error(exception);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: JSON.stringify(exception) }),
    };
  }
};

const createPerson = async (person) => {
  try {
    // Possíveis retornos
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithItems.html#:~:text=DynamoDB%20API%20operation.-,PutItem,-ReturnValues%3A%20ALL_OLD
    return await ddbClient
      .put({
        TableName: tableName,
        Item: person,
        ConditionExpression: 'attribute_not_exists (id)',
      })
      .promise();
  } catch (exception) {
    return false;
  }
};

const verifyRequiredParameters = (parameters) => {
  const requiredParameters = ['id', 'age'];
  let missingParameters = [];
  missingParameters = requiredParameters.filter((requiredParameter) => parameters[requiredParameter] === undefined);

  return missingParameters.length ? missingParameters.join(', ') : '';
};
