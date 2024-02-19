const Spinner = ({ size = '10' }) => {
  const sizeClass = `h-${size} w-${size}`;
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-yellow-500 ${sizeClass}`}
      ></div>
    </div>
  );
};

export default Spinner;
