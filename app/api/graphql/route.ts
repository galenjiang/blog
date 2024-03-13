import { revalidatePath } from "next/cache";
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { Void } from "./scalar";

enum Resource {
  ARTICLES = 'ARTICLES'
}

const resolvers = {
  Query: {
    greetings(obj: unknown, args: { name: string }, context: unknown, info: unknown) {
      return `hello ${args.name}`
    }
  },
  Mutation: {
    revalidate(obj: unknown, args: { resource: Resource }, context: unknown, info: unknown) {
      console.log(args)
      if (args.resource === Resource.ARTICLES) {
        revalidatePath('/articles')
        return { revalidated: true, now: Date.now() }
      }
      return { revalidated: false, now: Date.now() }
    },
  },
  Void: Void,
};

const typeDefs = gql`
  type Query {
    greetings(name: String!): String!
  }
  type Mutation {
    revalidate(resource: Resource!): RevalidateResult
  }

  enum Resource {
    ARTICLES
  }

  type RevalidateResult {
    revalidated: Boolean
    now: Float
  }

  scalar Void
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };