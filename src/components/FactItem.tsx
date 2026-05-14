import type { Fact } from '../types';

interface FactItemProps {
  fact: Fact;
};

export function FactItem({ fact }: FactItemProps) {
  return (
    <li>
      <p>{fact.text}</p>
      <a href={fact.source} target="_blank" rel="noreferrer">Fonte</a>
      <span>{fact.category}</span>
    </li>
  );
};
