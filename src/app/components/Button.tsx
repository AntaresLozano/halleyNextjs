export const Button = ({ name, path }: { name: string; path: string }) => {
  return (
    <a
      href={path}
      className="w-1/2 text-black text-center px-6 py-3 bg-[#00FF7F] hover:bg-[#3bff9c] cursor-pointer xl:w-1/3"
    >
      {name}
    </a>
  );
};
