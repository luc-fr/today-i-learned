import Header from "./components/Header";
import FactList from "./components/FactList";
import type { Fact } from "./types";
import { useState } from "react";

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
    id: 3,
    text: 'O Brasil é o maior produtor de café do mundo.',
    source: 'https://www.embrapa.br',
    category: 'history',
    votes_interesting: 18,
    votes_mindblowing: 5,
    votes_false: 2,
    created_at: '2026-05-14T20:57:21Z'
}];

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

    return (
        <>
            <Header showForm={showForm} onToggleForm={handleToggleForm} />
            { showForm && <p>Aqui conterá um formulário.</p> }
            <main>
                <FactList facts={displayedFacts} />
            </main>
        </>
    );
};
