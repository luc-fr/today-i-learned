import Header from "./components/Header";
import FactList from "./components/FactList";
import type { Fact } from "./types";
import { useState } from "react";
<<<<<<< HEAD
// import NewItem from "./components/NewItem";
=======
import CategoryFilter from "./components/CategoryFilter";
>>>>>>> 74d16d8 (feat: implementar filtragem de fatos por categoria)

const INITIAL_FACTS: Fact[] = [{
  id: 1,
  text: 'React foi criado pelo Facebook e lançado em maio de 2013.',
  source: 'https://react.dev',
  category: 'technology',
  votes_interesting: 22,
  votes_mindblowing: 9,
  votes_false: 1,
  created_at: '2026-05-14T20:52:52Z'
}, {
  id: 2,
  text: 'O cérebro humano tem cerca de 86 bilhões de neurônios.',
  source: 'https://www.ncbi.nlm.nih.gov',
  category: 'science',
  votes_interesting: 41,
  votes_mindblowing: 20,
  votes_false: 0,
  created_at: '2026-05-14T20:55:16Z'
}, {
<<<<<<< HEAD
    id: 3,
    text: 'O Brasil é o maior produtor de café do mundo.',
    source: 'https://www.embrapa.br',
    category: 'history',
    votes_interesting: 18,
    votes_mindblowing: 5,
    votes_false: 2,
    created_at: '2026-05-14T20:57:21Z'
},];
=======
  id: 3,
  text: 'O Brasil é o maior produtor de café do mundo.',
  source: 'https://www.embrapa.br',
  category: 'history',
  votes_interesting: 18,
  votes_mindblowing: 5,
  votes_false: 2,
  created_at: '2026-05-14T20:57:21Z'
}];
>>>>>>> 74d16d8 (feat: implementar filtragem de fatos por categoria)

export default function App() {
  const [facts, setFacts] = useState<Fact[]>(INITIAL_FACTS);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [showForm, setShowForm] = useState<boolean>(false);

  const displayedFacts = currentCategory === 'all'
    ? facts
    : facts.filter(fact => fact.category === currentCategory);

  function handleToggleForm() {
    setShowForm(showForm => !showForm);
  };

<<<<<<< HEAD
    // function addNewItem() {
    //     setFacts([...facts, {
    //         id: 4,
    //         text: 'Neymar foi convocado.',
    //         source: 'https://www.cbf.com.br',
    //         category: 'entertainment',
    //         votes_interesting: 50,
    //         votes_mindblowing: 6,
    //         votes_false: 65,
    //         created_at: '2026-05-19T18:33:31Z'
    //     }]);  
    // };

    return (
        <>
            <Header showForm={showForm} onToggleForm={handleToggleForm} />
            {showForm && <p>Aqui conterá um formulário.</p>}
            <main>
                <FactList facts={displayedFacts} />
            </main>
            {/* <NewItem addNewItem={addNewItem} /> */}
        </>
    );
};
=======
  function handleSelectCategory(category: string) {
    setCurrentCategory(category);
  };

  return (
    <>
      <Header
        showForm={showForm}
        onToggleForm={handleToggleForm}
      />
      { showForm && <p>Aqui conterá um formulário.</p> }
      <main>
        <CategoryFilter
          currentCategory={currentCategory}
          onSelectCategory={handleSelectCategory}
        />
        <FactList facts={displayedFacts} />
      </main>
    </>
  );
};
>>>>>>> 74d16d8 (feat: implementar filtragem de fatos por categoria)
