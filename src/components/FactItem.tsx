import type { Fact } from "../types";
import { CATEGORIES } from "../constants";
import { useState } from "react";
import { supabase } from "../supabaseClient";

interface FactItemProps {
  fact: Fact;
  onVote: () => Promise<void>;
};

export default function FactItem({ fact, onVote }: FactItemProps) {
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [voteError, setVoteError] = useState<string | null>(null);

  const category = CATEGORIES.find(object => fact.category === object.value);

  async function handleVote(
    column: 'votes_interesting' | 'votes_mindblowing' | 'votes_false'
  ) {
    setVoteError(null);
    setIsVoting(true);

    try {
      const { error } = await supabase
        .from('facts')
        .update({ [column]: fact[column] + 1 })
        .eq('id', fact.id);

      if (error) return setVoteError('Não foi possível registrar o voto. Tente novamente.');

      await onVote();


    } finally {
      setIsVoting(false);
    };

  };

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
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleVote('votes_interesting')}
            disabled={isVoting}
            className="bg-stone-600 text-[18px] pt-2.5 px-3 pb-1 rounded-full hover:bg-stone-800 btn disabled:opacity-50 disabled:scale-100 disabled:rotate-0"
          >❤️ {fact.votes_interesting}</button>
          <button
            onClick={() => handleVote('votes_mindblowing')}
            disabled={isVoting}
            className="bg-stone-600 text-[18px] pt-2.5 px-3 pb-1 rounded-full hover:bg-stone-800 btn disabled:opacity-50 disabled:scale-100 disabled:rotate-0"
          >🤯 {fact.votes_mindblowing}</button>
          <button
            onClick={() => handleVote('votes_false')}
            disabled={isVoting}
            className="bg-stone-600 text-[18px] pt-2.5 px-3 pb-1 rounded-full btn hover:bg-stone-800 disabled:opacity-50 disabled:scale-100 disabled:rotate-0"
          >👎 {fact.votes_false}</button>
          {voteError && <p className="text-red-500 text-[14px]">{voteError}</p>}
        </div>
      </li>
    </>
  );
};