import { DynamoDB } from 'aws-sdk';
const ddbClient = new DynamoDB.DocumentClient();

const tableName = 'People';

exports.handler = async (event) => {
  try {
    const people = await getPeople();

    if (!people.length) {
      return { statusCode: 204 };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(people),
    };
  } catch (exception) {
    console.error(exception);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

const getPeople = async (exclusiveStartKey = undefined) => {
  // Com paginação
  // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html#Scan.Pagination
  const { Items: items, LastEvaluatedKey: lastEvaluatedKey } = await ddbClient
    .scan({ TableName: tableName, ExclusiveStartKey: exclusiveStartKey })
    .promise();
  if (lastEvaluatedKey) {
    items.push(...(await getPeople(lastEvaluatedKey)));
  }

  return items;
};
