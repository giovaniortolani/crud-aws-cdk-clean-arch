import { DynamoDB } from 'aws-sdk';
import { PeopleRepository } from '../../../data/protocols/people-repository';
import { Person } from '../../../domain/entities/person';
import { UpdateDuaLipaAffinityType } from '../../../domain/use-cases/update-dualipa-affinity';

type DynamoDBDocumentClient = DynamoDB.DocumentClient;

export class DynamoPeopleRepository implements PeopleRepository {
  private client: DynamoDBDocumentClient;
  private readonly TABLE_NAME = 'People';

  constructor() {
    if (!this.client) {
      this.client = this.getClient();
    }
  }

  getClient(): DynamoDBDocumentClient {
    const documentClient = new DynamoDB.DocumentClient();
    return documentClient;
  }

  async add(person: Person): Promise<true> {
    await this.client
      .put({
        TableName: this.TABLE_NAME,
        Item: person,
        ConditionExpression: 'attribute_not_exists (id)',
      })
      .promise();
    return true;
  }

  async delete(id: string): Promise<true> {
    await this.client
      .delete({
        TableName: this.TABLE_NAME,
        Key: { id },
        ConditionExpression: 'attribute_exists (id)',
      })
      .promise();
    return true;
  }

  async find(id: string): Promise<Person> {
    const person: any = await this.client
      .get({
        TableName: this.TABLE_NAME,
        Key: { id },
      })
      .promise();

    return person?.Item as Person;
  }
  async retrieveAll(): Promise<Person[]> {
    // Alternativa: colocar essa função como um método da classe.
    const scan = async (exclusiveStartKey = undefined) => {
      // Com paginação
      // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html#Scan.Pagination
      const { Items: items, LastEvaluatedKey: lastEvaluatedKey } = await this.client
        .scan({ TableName: this.TABLE_NAME, ExclusiveStartKey: exclusiveStartKey })
        .promise();
      if (lastEvaluatedKey) {
        items.push(...(await scan(lastEvaluatedKey)));
      }

      return items ? (items as Person[]) : ([] as Person[]);
    };
    return scan();
  }

  async updateDuaLipaAffinity(person: UpdateDuaLipaAffinityType): Promise<Person> {
    const result = await this.client
      .update({
        TableName: this.TABLE_NAME,
        Key: { id: person.id },
        ReturnValues: 'ALL_NEW',
        ConditionExpression: 'attribute_exists (id)',
        UpdateExpression: 'SET #likesDuaLipa = :likesDuaLipa',
        ExpressionAttributeNames: {
          '#likesDuaLipa': 'likesDuaLipa',
        },
        ExpressionAttributeValues: {
          ':likesDuaLipa': person.likesDuaLipa,
        },
      })
      .promise();

    return result.Attributes as Person;
  }
}
