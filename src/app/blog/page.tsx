import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Tag } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";

export const metadata = {
  title: "Blog | LaunchCheck",
  description: "Latest insights and updates about web security scanning.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-900 px-4 py-24 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <div className="mx-auto mb-6 flex max-w-fit items-center rounded-full bg-white/10 px-4 py-1 backdrop-blur-sm">
              <Tag className="mr-2 h-5 w-5 text-red-500" />
              <span className="text-sm font-medium">Blog</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Security Insights & Updates
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-300">
              Learn about web security, best practices, and the latest in
              vulnerability prevention
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="bg-white px-4 py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.coverImage || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="mb-4 text-xl font-bold text-gray-900 group-hover:text-red-600">
                    {post.title}
                  </h2>
                  <p className="mb-6 flex-1 text-gray-600">{post.excerpt}</p>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
