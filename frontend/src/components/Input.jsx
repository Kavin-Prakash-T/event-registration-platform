const Input = ({ label, ...props }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
        {...props}
      />
    </div>
  );
};

export default Input;