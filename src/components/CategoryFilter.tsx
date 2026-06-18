import { CATEGORIES } from "../constants";

interface CategoryFilterProps {
  currentCategory: string;
  onSelectCategory: (category: string) => void;
};

export default function CategoryFilter({
  currentCategory,
  onSelectCategory
}: CategoryFilterProps) {
  return (
    <>
      <aside className="w-62.5">
        <ul className="flex flex-col gap-4">
          <li>
            <button
              onClick={() => onSelectCategory('all')}
              disabled={currentCategory === 'all'}
              className="w-full bg-linear-[135deg,#3b82f6,#ef4444,#16a34a,#eab308] mb-4 text-[17px] pt-4 pb-3.25 btn"
            >todas</button>
          </li>
          {CATEGORIES.map(category => (
            <li key={category.value}>
              <button
                onClick={() => onSelectCategory(category.value)}
                disabled={currentCategory === category.value}
                className={`${category.color} w-full text-[17px] pt-4 pb-3.25 btn`}
              >{category.label}</button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};