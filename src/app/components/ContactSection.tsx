export const ContactSection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between mt-8 lg:mt-[17rem] px-4 sm:px-6 lg:px-8 mb-20">
      <div className="flex-1 mb-8 lg:mb-0">
        <h2 className="text-3xl sm:text-4xl md:text-5xl">
          CONTACT US
        </h2>
      </div>
      <div className="flex-1 flex flex-col items-center max-w-4xl mx-auto lg:mx-0 lg:px-20">
        <p className="text-sm sm:text-base text-center lg:text-left w-full lg:w-[85%] mb-6">
          {`LET US KNOW WHAT YOU'RE LOOKING FOR ↴ AND WE'LL BE IN TOUCH.`}
        </p>

        <form className="w-full lg:w-[85%] space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              className="flex-1 border border-gray-400 px-4 py-3 text-sm sm:text-base"
              placeholder="FIRST NAME"
              type="text"
              required
            />
            <input
              className="flex-1 border border-gray-400 px-4 py-3 text-sm sm:text-base"
              placeholder="LAST NAME"
              type="text"
              required
            />
          </div>

          <input
            className="w-full border border-gray-400 px-4 py-3 text-sm sm:text-base"
            placeholder="EMAIL"
            type="email"
            required
          />

          <input
            className="w-full border border-gray-400 px-4 py-3 text-sm sm:text-base"
            placeholder="PHONE (OPTIONAL)"
            type="tel"
          />

          <input
            className="w-full border border-gray-400 px-4 py-3 text-sm sm:text-base"
            placeholder="SUBJECT"
            type="text"
            required
          />

          <textarea
            className="w-full border border-gray-400 px-4 py-3 h-32 sm:h-40 text-sm sm:text-base"
            placeholder="DESCRIPTION"
            required
          ></textarea>

          <button
            className="w-full sm:w-[200px] py-2 px-6 bg-[#00FF7F] hover:bg-[#00E673] text-black font-medium transition-colors duration-200"
            type="submit"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};
