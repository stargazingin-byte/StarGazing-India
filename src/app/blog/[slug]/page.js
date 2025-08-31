import { notFound } from 'next/navigation';
import { getPostData, getAllPostSlugs } from '@/lib/blog';

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }) {
  const post = await getPostData(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} on StarGazing India`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} on StarGazing India`,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPost({ params }) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          {post.excerpt && (
            <p className="text-lg text-gray-700 mb-6">{post.excerpt}</p>
          )}
        </header>
        
        <div className="prose prose-lg max-w-none">
          {/* Render markdown content */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>
    </div>
  );
}
