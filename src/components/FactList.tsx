import type { Fact } from "../types";
import FactItem from "./FactItem";

interface FactListProps {
  facts: Fact[]
};

export default function FactList({ facts }: FactListProps) {
  if (facts.length === 0) {
    return <p>Nenhum fato para esta categoria ainda. Crie o primeiro! ✌️</p>
  };

  return (
    <>
      <ul>
        { facts.map(fact => {
          return <FactItem key={fact.id} fact={fact} />
        }) }
      </ul>
    </>
  );
};