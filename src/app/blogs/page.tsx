import { BlogList } from "./components/BlogList";
import { Blog } from "./interfaces/blog.interface";

export default function Blogs() {
  const blogs: Blog[] = [
    {
      id: "1",
      img: "/images/blog1.png",
      title: "Blog Title 1",
      description:
        "cositas Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "VIDEO PRODUCTION",
      date: "2022-01-01",
      slug: "blog-title-1",
    },
    {
      id: "2",
      img: "/images/blog1.png",
      title: "Blog Title 2",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "POST PRODUCTION",
      date: "2022-01-02",
      slug: "blog-title-2",
    },
    {
      id: "3",
      img: "/images/blog1.png",
      title: "Blog Title 3",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "PHOTOGRAPHY",
      date: "2022-01-03",
      slug: "blog-title-3",
    },
    {
      id: "4",
      img: "/images/blog1.png",
      title: "Blog Title 3",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "VIDEO PRODUCTION",
      date: "2022-01-04",
      slug: "blog-title-3-video-production",
    },
    {
      id: "5",
      img: "/images/blog1.png",
      title: "Blog Title 3",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "POST PRODUCTION",
      date: "2022-01-05",
      slug: "blog-title-3-post-production",
    },
    {
      id: "6",
      img: "/images/blog1.png",
      title: "Blog Title 3",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "PHOTOGRAPHY",
      date: "2022-01-06",
      slug: "blog-title-3-photography",
    },
    {
      id: "7",
      img: "/images/blog1.png",
      title: "Blog Title 1",
      description:
        "cositas Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "VIDEO PRODUCTION",
      date: "2022-01-01",
      slug: "blog-title-1-video-production",
    },
    {
      id: "8",
      img: "/images/blog1.png",
      title: "Blog Title 2",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "POST PRODUCTION",
      date: "2022-01-02",
      slug: "blog-title-2-post-production",
    },
    {
      id: "9",
      img: "/images/blog1.png",
      title: "Blog Title 3",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "PHOTOGRAPHY",
      date: "2022-01-03",
      slug: "blog-title-3-photography",
    },
    {
      id: "10",
      img: "/images/blog1.png",
      title: "Blog Title 3",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "VIDEO PRODUCTION",
      date: "2022-01-04",
      slug: "blog-title-3-video-production",
    },
    {
      id: "11",
      img: "/images/blog1.png",
      title: "Blog Title 3",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "POST PRODUCTION",
      date: "2022-01-05",
      slug: "blog-title-3-post-production",
    },
    {
      id: "12",
      img: "/images/blog1.png",
      title: "Blog Title 3",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "PHOTOGRAPHY",
      date: "2022-01-06",
      slug: "blog-title-3-photography",
    },
  ];

  return (
    <div className="w-screen pt-[20vh]  md:pt-[30vh] flex flex-col items-center">
      <h1 className="text-white text-center text-5xl md:text-9xl mb-0 md:mb-8">
        AUDIOVISUAL BLOG
      </h1>
      <BlogList blogs={blogs} />
    </div>
  );
}
