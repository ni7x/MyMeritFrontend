const Loading = () => {
  return (
    <div className="flex flex-row justify-center items-center">
      <svg
        className="animate-spin h-5 w-5 mr-3 text-white"
        viewBox="0 0 24 24"
      ></svg>
      Loading...
    </div>
  );
};

export default Loading;
