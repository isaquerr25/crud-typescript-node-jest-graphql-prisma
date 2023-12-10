import { Resolver, Query, Mutation, Arg, Field } from 'type-graphql';
import { UpdateUserInput, User } from '../models/User';
import { PrismaClient } from '@prisma/client';
import { Redis } from 'ioredis';

const prisma = new PrismaClient();
const redis = new Redis();

@Resolver(User)
export class UserResolver {
  // Example query to get a user by ID
  @Query(() => User, { nullable: true })
  async getUserById(@Arg('id') id: number): Promise<User | null> {
    // Try to get the user from the Redis cache
    const cachedUser = await redis.get(`user:${id}`);

    if (cachedUser) {
      return JSON.parse(cachedUser);
    }

    // If not in the cache, fetch from the database using Prisma
    const user = await prisma.user.findUnique({ where: { id } });

    // Put the user in the Redis cache with a time-to-live (TTL)
    if (user) {
      await redis.set(`user:${id}`, JSON.stringify(user), 'EX', 60); // Expires in 60 seconds
    }

    return user || null;
  }

  @Query(() => User, { nullable: true })
  async getUserByEmail(@Arg('email') email: string): Promise<User | null> {
    // Try to get the user from the Redis cache
    const cachedUser = await redis.get(`user:${email}`);

    if (cachedUser) {
      return JSON.parse(cachedUser);
    }

    // If not in the cache, fetch from the database using Prisma
    const user = await prisma.user.findUnique({ where: { email } });

    // Put the user in the Redis cache with a time-to-live (TTL)
    if (user) {
      await redis.set(`user:${email}`, JSON.stringify(user), 'EX', 60); // Expires in 60 seconds
    }

    return user || null;
  }

  // Mutation example to create a new user
  @Mutation(() => User)
  async createUser(
    @Arg('username') username: string,
    @Arg('email') email: string,
  ): Promise<User> {
    const newUser = await prisma.user.create({
      data: { username, email },
    });
    return newUser;
  }

  // Mutation example to update a user

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg('id') id: number,
    @Arg('updateInput', () => UpdateUserInput) updateInput: UpdateUserInput,
  ): Promise<User | null> {
    const existingUser = await prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      return null;
    }

    // Update the user in the database using Prisma
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateInput,
    });

    // Remove the old user from the Redis cache
    await redis.del(`user:${id}`);

    return updatedUser;
  }

  // Mutation example to delete a user by email
  @Mutation(() => User, { nullable: true })
  async deleteUserByEmail(@Arg('email') email: string): Promise<User | null> {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      // Logic to handle the case where the user does not exist
      return null;
    }

    // The user exists, so we can delete them
    const deletedUser = await prisma.user.delete({ where: { email } });
    return deletedUser;
  }
}
