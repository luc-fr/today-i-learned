import Header from "./components/Header";
import FactList from "./components/FactList";
import type { Fact } from "./types";
import { useEffect, useRef, useState } from "react";
import CategoryFilter from "./components/CategoryFilter";
import NewFactForm from "./components/NewFactForm";
import { supabase } from "./supabaseClient";

export default function App() {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function handleToggleForm() {
    setShowForm(showForm => !showForm);
  };

  function handleSelectCategory(category: string) {
    setCurrentCategory(category);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showForm) inputRef.current?.focus();
  }, [showForm]);

  async function loadFacts() {
    setIsLoading(true);

    let query = supabase
      .from('facts')
      .select('*')
      .order('created_at', { ascending: false });

    if (currentCategory !== 'all') {
      query = query.eq('category', currentCategory);
    };

    const { data, error } = await query;

    if (error) {
      setError('Não foi possível carregar os fatos. Tente novamente.');
      setIsLoading(false);
      return;
    };

    setFacts(data as Fact[]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadFacts();
  }, [currentCategory]);

  return (
    <>
      <Header
        showForm={showForm}
        onToggleForm={handleToggleForm}
      />
      {showForm && (
        <NewFactForm
          inputRef={inputRef}
          onAddFact={loadFacts}
        />
      )}
      <main className="flex gap-12">
        <CategoryFilter
          currentCategory={currentCategory}
          onSelectCategory={handleSelectCategory}
        />
        <FactList
          facts={facts}
          isLoading={isLoading}
          error={error}
          onVote={loadFacts}
        />
      </main>
    </>
  );
};