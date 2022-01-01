# Serverless Challenge
An employee management application, using a `non-relational database`, which will be implemented within a `serverless` and using the concepts of a `clean architecture`.

## Features
* Create Employee
* Find Employee
* Update Employee
* Delete Employee

## Stack
* Serverless Framework
* AWS Lambda
* MongoDB
* TypeScript
* Jest


## Running Locally

### Prerequisites
* [Git](https://git-scm.com/downloads)
* [Node JS](https://nodejs.org/en/)


### 1. Clone the repository and install dependencies
```bash
git clone repository_url
cd serverless-challenge
npm i
```

### 2. Install and Configure Serverless Framework with your AWS credentials
```bash
npm i -g serverless
serverless config credentials --provider aws --key your_aws_key --secret your_aws_secret
```

### 3. Create an .env file in the project root and enter the MongoDB URI
```bash
MONGODB_URI=YOUR_MONGODB_URI
```

### 4. Test Application
```bash
npm run test
```

### 5. Deploy to AWS
```bash
npm run deploy
```