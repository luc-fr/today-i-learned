import type { Fact } from '../types';

interface FactItemProps {
  fact: Fact;
};

export default function FactItem({ fact }: FactItemProps) {
  return (
    <>
      <li>
        <p>{ fact.text }</p>
        <a href={ fact.source } target="_blank" >Fonte</a>
        <span>{ fact.category }</span>
      </li>
    </>
  );
};
