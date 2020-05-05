# AWS cognito user authentication using React

This is a starter ReactJS template for user authentication using [AWS Cognito](https://aws.amazon.com/cognito/) user pool.

## Functions included

- Sign up
- Login
- Change password
- Forget / reset password
- View personal profile stored in Cognito

## Getting started with Cognito

Follow the link to [create a user pool](https://docs.aws.amazon.com/cognito/latest/developerguide/getting-started-with-cognito-user-pools.html).  

Insert user pool **region**, **id** and **app client id** into file AWS-cognito-react-user-authentication/src/components/auth/CognitoConfig.js

## Installing

```sh
npm install
```

## Built With

- [aws-amplify AuthClass](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html) - uses Amazon Cognito as the main authentication provider
