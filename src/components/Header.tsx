interface HeaderProps {
  showForm: boolean;
  onToggleForm: () => void;
};

export function Header({ showForm, onToggleForm }: HeaderProps) {
  return (
    <header>
      <h1>Today I Learned</h1>
      <button onClick={onToggleForm}>
        { showForm ? 'Fechar' : 'Compartilhe um fato' }
      </button>
    </header>
  );
};
