// src/resolvers/PostResolver.ts
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { Post } from '../models/Post';

const prisma = new PrismaClient();

@Resolver()
export class PostResolver {
  @Query(() => Post, { nullable: true })
  async getPost(@Arg('id') id: number): Promise<Post | null> {
    try {
      const post = await prisma.post.findUnique({
        where: { id },
      });

      return post || null;
    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  }

  @Query(() => [Post])
  async posts() {
    return await prisma.post.findMany();
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg('id') id: number) {
    return await prisma.post.findUnique({ where: { id } });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg('title') title: string,
    @Arg('content') content: string,
    @Arg('userId') userId: number,
  ) {
    return await prisma.post.create({
      data: { title, content, userId },
    });
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg('id') id: number,
    @Arg('title') title: string,
    @Arg('content') content: string,
    @Arg('userId') userId: number,
  ) {
    return await prisma.post.update({
      where: { id },
      data: { title, content, userId },
    });
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg('id') id: number) {
    await prisma.post.delete({ where: { id } });
    return true;
  }
}
