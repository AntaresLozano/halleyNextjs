import { Blogs } from "@/app/components/Blogs";
import Image from "next/image";
import { notFound } from "next/navigation";

type BlogPost = {
  title: string;
  content: string;
  date: string;
  topic: string;
  img: string;
};

const mockPosts: Record<string, BlogPost> = {
  "blog-title-1": {
    title: "Blog Title 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id dignissim elit. Pellentesque tristique ultricies magna nec rhoncus. Aenean rhoncus blandit lorem, eget congue ipsum. Nam scelerisque, turpis id auctor tristique, quam orci mollis leo, sed placerat ante enim eget risus. Ut at posuere turpis, eu malesuada nisi. Sed blandit lacinia nisl, vitae consectetur magna finibus eget. Pellentesque nec urna nec nisi suscipit vulputate nec quis felis. Fusce consectetur, neque nec accumsan aliquam, ex tellus varius augue, a ullamcorper nunc ante vel urna. <br>  <br> Phasellus ut accumsan erat. Donec ac libero nec nisi pharetra rhoncus sit amet ut lectus. Donec in dui convallis, tempor felis nec, malesuada felis. Suspendisse ultrices dignissim neque, nec vehicula ligula auctor sit amet. Mauris eu eros eget nibh lobortis elementum sit amet a lectus. Nunc mattis, nibh ac sodales auctor, libero libero mollis purus, non scelerisque urna diam nec sem. <br> <br> Nulla facilisi. Phasellus vel ornare tellus, nec semper est. Nam a diam dignissim nisi luctus iaculis. Mauris consectetur sollicitudin ornare. Suspendisse viverra euismod erat.Nam condimentum condimentum nunc pulvinar sodales. Fusce eu bibendum enim, id elementum magna. Nam sed pulvinar est, nec convallis dolor. Suspendisse eleifend ex velit, et congue ante malesuada egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse commodo, arcu in feugiat hendrerit, turpis massa euismod quam, a sagittis nulla nisi quis massa. Nullam id enim ante. In id ipsum vitae risus congue lobortis. Nullam magna lectus, iaculis sed tempus in, congue vehicula nisl. Cras eget felis nec mi mollis porta eu et sapien."
      ,
    date: "2022-01-01",
    topic: "VIDEO PRODUCTION",
    img: "/images/blog1.png",
  },
  "blog-title-2": {
    title: "Blog Title 2",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
    date: "2022-01-02",
    topic: "POST PRODUCTION",
    img: "/images/blog1.png",
  },
  "blog-title-3": {
    title: "Blog Title 3",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
    date: "2022-01-03",
    topic: "PHOTOGRAPHY",
    img: "/images/blog1.png",
  },
  "blog-title-3-video-production": {
    title: "Blog Title 3",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
    date: "2022-01-04",
    topic: "VIDEO PRODUCTION",
    img: "/images/blog1.png",
  },
  "blog-title-3-post-production": {
    title: "Blog Title 3",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
    date: "2022-01-05",
    topic: "POST PRODUCTION",
    img: "/images/blog1.png",
  },
  "blog-title-3-photography": {
    title: "Blog Title 3",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
    date: "2022-01-06",
    topic: "PHOTOGRAPHY",
    img: "/images/blog1.png",
  },
  "blog-title-1-video-production": {
    title: "Blog Title 1",
    content:
      "cositas Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
    date: "2022-01-01",
    topic: "VIDEO PRODUCTION",
    img: "/images/blog1.png",
  },
  "blog-title-2-post-production": {
    title: "Blog Title 2",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
    date: "2022-01-02",
    topic: "POST PRODUCTION",
    img: "/images/blog1.png",
  },
};

type Props = {
  params: {
    slug: string;
  };
};

export default function BlogDetailPage({ params }: Props) {
  const post = mockPosts[params.slug];

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
      <Blogs />
    </main>
  );
}
