interface HeaderProps {
  showForm: boolean;
  onToggleForm: () => void;
};

export default function Header(
  { showForm, onToggleForm }: HeaderProps
) {
  return (
    <>
      <header>
        <h1>hoje eu aprendi</h1>
        <button onClick={onToggleForm}>
          { showForm ? 'fechar' : 'compartilhar um fato' }
        </button>
      </header>
    </>
  );
};
