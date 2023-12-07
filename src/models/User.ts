import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id!: number;

  @Field()
  username!: string;

  @Field()
  email!: string;

  // ... other fields as needed
}
