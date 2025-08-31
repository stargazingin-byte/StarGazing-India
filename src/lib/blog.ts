import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

interface PostData {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  content?: string;
  slug: string;
  [key: string]: any;
}

// Get all posts data for sitemap and blog listing
export async function getAllPostsData(): Promise<PostData[]> {
  try {
    // Check if posts directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn('Posts directory does not exist, returning empty array');
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map(fileName => {
        // Remove ".md" or ".mdx" from file name to get id
        const id = fileName.replace(/\.(md|mdx)$/, '');
        const slug = id;

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        return {
          id,
          slug,
          title: matterResult.data.title || id,
          date: matterResult.data.date || new Date().toISOString(),
          excerpt: matterResult.data.excerpt || '',
          content: matterResult.content,
          ...matterResult.data,
        };
      });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

// Get post data by slug
export async function getPostData(slug: string): Promise<PostData | null> {
  try {
    const allPosts = await getAllPostsData();
    return allPosts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error('Error getting post data:', error);
    return null;
  }
}

// Get all post slugs for static generation
export async function getAllPostSlugs(): Promise<string[]> {
  const allPosts = await getAllPostsData();
  return allPosts.map(post => post.slug);
}
