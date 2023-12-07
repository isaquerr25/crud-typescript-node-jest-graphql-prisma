import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class Post {
  @Field(() => Int)
  id!: number;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field(() => Int)
  userId!: number;

  // ... other fields as needed
}
