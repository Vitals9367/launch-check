import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  coverImage: string;
  author: string;
  content: string;
  readingTime: string;
}

export interface ProjectMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  technologies: string[];
  github?: string;
  liveUrl?: string;
  content: string;
  featured: boolean;
}

const POSTS_DIRECTORY = path.join(process.cwd(), "src/posts");

// Ensure directories exist
[POSTS_DIRECTORY].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

export function getPostBySlug(slug: string): PostMeta | null {
  try {
    const fullPath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      slug,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      title: data.title,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      date: data.date,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      tags: data.tags,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      excerpt: data.excerpt,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      coverImage: data.coverImage,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      author: data.author,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      readingTime: data.readingTime,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      content,
    } as PostMeta;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is PostMeta => post !== null);
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

export function searchPosts(query: string): PostMeta[] {
  const posts = getAllPosts();
  const searchTerms = query.toLowerCase().split(" ");

  return posts.filter((post) => {
    const searchableText = [
      post.title,
      post.excerpt,
      post.content,
      ...post.tags,
      post.author,
    ]
      .join(" ")
      .toLowerCase();

    return searchTerms.every((term) => searchableText.includes(term));
  });
}

export function getRelatedPosts(currentSlug: string, limit = 3): PostMeta[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const allPosts = getAllPosts();

  // Remove the current post from the list
  const otherPosts = allPosts.filter((post) => post.slug !== currentSlug);

  // Calculate relevance score based on shared tags
  const postsWithScore = otherPosts.map((post) => {
    const sharedTags = post.tags.filter((tag) =>
      currentPost.tags.includes(tag),
    );
    return {
      post,
      score: sharedTags.length,
    };
  });

  // Sort by score (most shared tags first) and date (newer first)
  return postsWithScore
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .slice(0, limit)
    .map((item) => item.post);
}

export function getPostsByTag(tag: string): PostMeta[] {
  const posts = getAllPosts();
  return posts.filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()),
  );
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagCounts = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    });
  });

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
