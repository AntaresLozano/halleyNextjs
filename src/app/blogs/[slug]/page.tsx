import { Blogs } from "@/app/components/Blogs";
import { fetchData } from "@/utils/api";
import { getImageUrl } from "@/utils/images";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

async function getBlogData(slug: string) {
  return await fetchData(`/blogs?filters[slug][$eq]=${slug}`);
}

async function getBlogsData() {
  return await fetchData("/blogs");
}

type Props = {
  params: Promise<{ slug: string }>;
};

function readingMinutes(markdown?: string | null) {
  const words = (markdown ?? "").replace(/[#*_>\[\]()`-]/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getBlogData(slug))?.[0];
  if (!post) return { title: "Not found" };
  const image = post.mainImage?.url ? getImageUrl(post.mainImage) : undefined;
  return {
    title: post.title,
    description: post.shortDescription ?? undefined,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.shortDescription ?? undefined,
      url: `/blogs/${post.slug}`,
      images: image ? [{ url: image, alt: post.mainImage?.alternativeText ?? post.title }] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = (await getBlogData(slug))?.[0];
  const blogsData = await getBlogsData();

  if (!post) {
    notFound();
  }

  return (
    <main className="py-10 mt-20 md:mt-40">
      <div className="mx-4 sm:mx-7 md:mx-20 mb-10">
        {post.topic && <span className="text-sm sm:text-base">{post.topic.toUpperCase()}</span>}
        <h1 className="text-3xl sm:text-5xl md:text-7xl">{post.title?.toUpperCase()}</h1>
        <div className="flex flex-wrap pb-5 pt-2 gap-3">
          {post.date && (
            <p className="text-xs text-white py-2 px-6 border-1 border-white">
              {post.date}
            </p>
          )}
          <p className="text-xs text-white py-2 px-6 border-1 border-white">
            {readingMinutes(post.content)} MIN
          </p>
        </div>
      </div>
      <div className="w-full relative h-[40vh] sm:h-[50vh] md:h-[600px]">
        <Image
          src={getImageUrl(post.mainImage)}
          alt={post.mainImage?.alternativeText ?? post.title ?? ""}
          fill
          className="object-cover"
          priority
        />
      </div>
      <article className="mx-4 sm:mx-10 md:mx-40 my-12 md:my-20 text-white max-w-none text-sm sm:text-base leading-relaxed [&_h1]:text-2xl [&_h1]:sm:text-3xl [&_h1]:md:text-4xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:sm:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_a]:text-[#00FF7F] [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-[#00FF7F] [&_blockquote]:pl-5 [&_blockquote]:my-6 [&_blockquote]:italic [&_blockquote]:text-gray-300 [&_li]:mb-2">
        <ReactMarkdown 
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            img: ({...props}) => (
              <Image
                src={String(props.src || '')}
                alt={String(props.alt || '')}
                width={800}
                height={400}
                className="rounded-lg my-8 max-w-full h-auto w-full"
              />
            ),
          }}
        >
          {post.content ?? ''}
        </ReactMarkdown>
      </article>
      <Blogs blogsData={blogsData} getProjects={true} />
    </main>
  );
}

