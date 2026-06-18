import type { Fact } from "../types";
import { CATEGORIES } from "../constants";

interface FactItemProps {
  fact: Fact;
};

export default function FactItem({ fact }: FactItemProps) {
  const category = CATEGORIES.find(object => fact.category === object.value);

  return (
    <>
      <li className="bg-stone-700 px-6 py-4 flex justify-between items-center gap-4 rounded-2xl">
        <p className="text-[20px]">
          {fact.text}
          <a
            href={fact.source}
            target="_blank"
            className="text-stone-400 text-[20px] capitalize hover:text-blue-500 transition duration-150"
          > (fonte)</a>
        </p>
        <span
          className={`${category?.color} text-[14px] uppercase pt-0.75 px-2.5 rounded-full `}
        >{category?.label}</span>
      </li>
    </>
  );
};