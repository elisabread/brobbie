import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  aws_ec2 as ec2,
  aws_lambda as lambda,
  aws_appsync as appsync,
  Duration,
} from "aws-cdk-lib";
import * as dotenv from "dotenv";

dotenv.config();

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    ////////////////////////////////////////////////////////////////////////////////
    // Brobbie GraphQL API
    ////////////////////////////////////////////////////////////////////////////////

    /**
     * Create the AppSync API
     */
    const api = new appsync.GraphqlApi(this, "brobbie-api", {
      name: "Brobbie API",
      schema: appsync.SchemaFile.fromAsset(
        "lambdafns/api/src/graphql/schema.graphql",
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
    });

    /**
     * Create lambda that will connect API in AppSync with Neptune
     */
    const lambdaFn = new lambda.Function(this, "brobbie-api-lambda-fn", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("dist/lambdaFns/api"),
      timeout: Duration.seconds(20),
      vpc: ec2.Vpc.fromLookup(this, "lambda-vpc-2", {
        vpcId: process.env.VPC_ID,
      }),
      allowPublicSubnet: true,
    });

    /**
     * Add cluster endpoints as env variables in lambda
     */
    lambdaFn.addEnvironment("NEPTUNE_READER", process.env.NEPTUNE_READER!);
    lambdaFn.addEnvironment("NEPTUNE_WRITER", process.env.NEPTUNE_WRITER!);
    lambdaFn.addEnvironment("NEPTUNE_ENDPOINT", process.env.NEPTUNE_ENDPOINT!);
    lambdaFn.addEnvironment("PORT", process.env.PORT!);

    /**
     * Add Lambda as datasource for API in AppSync
     */
    const lambdaDatasource = api.addLambdaDataSource(
      "brobbie-api-lambda-fn",
      lambdaFn,
    );

    /**
     * Specify how the Text GraphQL fields will get their value
     */
    lambdaDatasource.createResolver("brobbie-list-text-resolver", {
      typeName: "Query",
      fieldName: "listText",
    });

    lambdaDatasource.createResolver("brobbie-list-texts-resolver", {
      typeName: "Query",
      fieldName: "listTexts",
    });

    lambdaDatasource.createResolver("brobbie-create-text-resolver", {
      typeName: "Mutation",
      fieldName: "createText",
    });

    lambdaDatasource.createResolver("brobbie-delete-text-resolver", {
      typeName: "Mutation",
      fieldName: "deleteText",
    });

    lambdaDatasource.createResolver("brobbie-update-text-resolver", {
      typeName: "Mutation",
      fieldName: "updateText",
    });

    /**
     * Specify how the Comment GraphQL fields will get their value
     */
    lambdaDatasource.createResolver("brobbie-list-comments-resolver", {
      typeName: "Query",
      fieldName: "listComments",
    });
    lambdaDatasource.createResolver("brobbie-create-comment-resolver", {
      typeName: "Mutation",
      fieldName: "createComment",
    });
    lambdaDatasource.createResolver("brobbie-delete-comment-resolver", {
      typeName: "Mutation",
      fieldName: "deleteComment",
    });
    lambdaDatasource.createResolver("brobbie-update-comment-resolver", {
      typeName: "Mutation",
      fieldName: "updateComment",
    });
  }
}
