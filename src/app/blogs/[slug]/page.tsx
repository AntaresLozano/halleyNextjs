import { Blogs } from "@/app/components/Blogs";
import { fetchData } from "@/utils/api";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getBlogData(slug: string) {
  return await fetchData(`/blogs?filters[slug][$eq]=${slug}`);
}

async function getBlogsData() {
  return await fetchData("/blogs");
}

type Props = {
  params: {
    slug: string;
  };
};

export default async function BlogDetailPage({ params }: Props) {
  const post = await getBlogData(params.slug);
  const blogsData = await getBlogsData();

  console.log(post);

  if (!post) {
    notFound(); // Devuelve un 404 si no encuentra el slug
  }

  return (
    <main className="prose py-10 mt-20 md:mt-40">
      <div className="mx-7 md:mx-20 mb-10">
        <span>{post.topic.toUpperCase()}</span>
        <h1 className="text-7xl">{post.title.toUpperCase()}</h1>
        <div className="flex pb-5 pt-2 gap-3">
          <p className="text-xs text-white py-2 px-6 border-1 border-white">
            {post.date}
          </p>
          <p className="text-xs text-white py-2 px-6 border-1 border-white">
            9 MIN
          </p>
        </div>
      </div>
      <div className="w-full relative h-[600px]">
        <Image
          src={post.img}
          alt="blog image"
          fill
          className="object-cover"
          priority
        />
      </div>
      <article
        className=" mx-10 md:mx-40 my-20 text-white prose prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <Blogs blogsData={blogsData} />
    </main>
  );
}
