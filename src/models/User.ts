import { ObjectType, Field, Int, InputType } from 'type-graphql';

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

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;
}
