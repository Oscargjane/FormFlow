const Spinner = ({ size = '10', color }) => {
  const sizeClass = `h-${size} w-${size}`;
  const colorClass = `border-${color}-500`;
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 ${colorClass} ${sizeClass}`}
      ></div>
    </div>
  );
};

export default Spinner;
