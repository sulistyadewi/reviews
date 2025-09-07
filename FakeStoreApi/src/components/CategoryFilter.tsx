interface Props {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

const CategoryFilter = ({ categories, selected, onChange }: Props) => {
  // console.log(categories, "ini categories");

  return (
    <div className="flex justify-center capitalize gap-3 mb-3 mt-5">
      <button
        className={`px-3 py-2 rounded-xl transition-colors duration-200 ${
          selected === "all"
            ? "bg-sky-600 text-sky-50 dark:bg-sky-900"
            : "bg-sky-300 text-black hover:bg-sky-500 dark:bg-sky-700 dark:text-gray-800"
        }`}
        onClick={() => onChange("all")}
      >
        All
      </button>
      {categories.map((category, index) => (
        <button
          key={index}
          className={`px-3 py-2 rounded-xl capitalize transition-colors duration-200 ${
            selected === category
              ? "bg-sky-600 text-sky-50 dark:bg-sky-900"
              : "bg-sky-300 text-black hover:bg-sky-500 dark:bg-sky-700 dark:text-gray-800"
          }`}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
