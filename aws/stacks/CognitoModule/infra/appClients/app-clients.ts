import { UserPoolClientOptions } from 'aws-cdk-lib/aws-cognito';

type UserPoolAppClient = {
  id: string;
  options?: UserPoolClientOptions;
};

export const appClientsConfiguration: UserPoolAppClient[] = [
  {
    id: 'UserPoolAppClient',
    options: {
      userPoolClientName: 'UserPoolAppClient',
      authFlows: { userPassword: true },
      oAuth: {
        callbackUrls: ['https://example.com/callback'],
        logoutUrls: ['https://example.com/signout'],
      },
      preventUserExistenceErrors: true,
    },
  },
];
