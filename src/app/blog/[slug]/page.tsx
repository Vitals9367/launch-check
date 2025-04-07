import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, Tag, Badge } from "lucide-react";
import Link from "next/link";
import { getPostSlugs, getPostBySlug } from "@/app/lib/mdx";
import { Metadata } from "next";
import Markdown from "markdown-to-jsx";
import moment from "moment";

type tParams = Promise<{ slug: string }>;

interface PostPageProps {
  params: tParams;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            fill
            priority
            className="object-cover brightness-[0.7]"
          />
        </div>
        <div className="relative bg-gradient-to-t from-gray-900/80 to-gray-900/40 px-4 py-24 text-white">
          <div className="container mx-auto max-w-4xl">
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all posts
            </Link>

            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>
                  {moment(new Date(post.date)).format("MMMM d, yyyy")}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg mx-auto max-w-none">
            <Markdown>{post.content}</Markdown>
          </div>
        </div>
      </div>
    </article>
  );
}
