import Image from "next/image";
import { TopicSelector } from "./components/TopicSelector";
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
    },
    {
      id: "2",
      img: "/images/blog1.png",
      title: "Blog Title 2",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "POST PRODUCTION",
      date: "2022-01-02",
    },
    {
      id: "3",
      img: "/images/blog1.png",
      title: "Blog Title 3",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "PHOTOGRAPHY",
      date: "2022-01-03",
    },
    {
      id: "4",
      img: "/images/blog1.png",
      title: "Blog Title 3",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "VIDEO PRODUCTION",
      date: "2022-01-04",
    },
    {
      id: "5",
      img: "/images/blog1.png",
      title: "Blog Title 3",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "POST PRODUCTION",
      date: "2022-01-05",
    },
    {
      id: "6",
      img: "/images/blog1.png",
      title: "Blog Title 3",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "PHOTOGRAPHY",
      date: "2022-01-06",
    },
    {
      id: "7",
      img: "/images/blog1.png",
      title: "Blog Title 1",
      description:
        "cositas Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "VIDEO PRODUCTION",
      date: "2022-01-01",
    },
    {
      id: "8",
      img: "/images/blog1.png",
      title: "Blog Title 2",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "POST PRODUCTION",
      date: "2022-01-02",
    },
    {
      id: "9",
      img: "/images/blog1.png",
      title: "Blog Title 3",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "PHOTOGRAPHY",
      date: "2022-01-03",
    },
    {
      id: "10",
      img: "/images/blog1.png",
      title: "Blog Title 3",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "VIDEO PRODUCTION",
      date: "2022-01-04",
    },
    {
      id: "11",
      img: "/images/blog1.png",
      title: "Blog Title 3",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "POST PRODUCTION",
      date: "2022-01-05",
    },
    {
      id: "12",
      img: "/images/blog1.png",
      title: "Blog Title 3",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
      topic: "PHOTOGRAPHY",
      date: "2022-01-06",
    },
  ];

  return (
    <div className="w-screen pt-[35vh] flex flex-col items-center">
      <h1 className="text-white text-9xl mb-8">AUDIOVISUAL BLOG</h1>
      <div className="w-1/2 h-16 bg-transparent border-2 border-white text-white text-2xl flex  py-2">
        <div className="w-16 border-r-2 border-white h-full flex items-center justify-center">
          <Image
            src="/images/search.svg"
            width={30}
            height={10}
            alt="search"
            className="object-contain"
          />
        </div>
        <input
          type="text"
          placeholder="SEARCH..."
          className="w-full h-full bg-transparent text-white text-2xl pl-4 mb-2 focus:outline-none"
        />
      </div>
      <TopicSelector />
      <BlogList blogs={blogs} />
    </div>
  );
}
