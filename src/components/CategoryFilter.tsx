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
      <aside>
        <ul>
          <li>
            <button
              onClick={() => onSelectCategory('all')}
              disabled={currentCategory === 'all'}
            >todas</button>
          </li>
          {CATEGORIES.map(category => (
            <li key={category.value}>
              <button
                onClick={() => onSelectCategory(category.value)}
                disabled={currentCategory === category.value}
              >{category.label}</button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};