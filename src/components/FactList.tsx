import type { Fact } from "../types";
import FactItem from "./FactItem";

interface FactListProps {
  facts: Fact[];
  isLoading: boolean;
  error: string | null;
};

export default function FactList({
  facts,
  isLoading,
  error
}: FactListProps) {
  if (isLoading) {
    return <p className="text-[32px] font-semibold flex-1">Caregando fatos...</p>;
  };

  if (error) {
    return <p className="text-[32px] font-semibold flex-1">{error}</p>
  }

  if (facts.length === 0) {
    return <p className="text-[32px] font-semibold flex-1">Nenhum fato para esta categoria ainda. Compartilhe o primeiro! ✌️</p>;
  };

  return (
    <>
      <ul className="flex flex-col flex-1 gap-4">
        { facts.map(fact => {
          return <FactItem key={fact.id} fact={fact} />
        }) }
      </ul>
    </>
  );
};