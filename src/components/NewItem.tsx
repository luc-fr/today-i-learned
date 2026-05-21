interface NewItemProps {
    addNewItem: () => void;
}

export default function NewItem({ addNewItem }: NewItemProps) {
    return (
        <>
            <button onClick={addNewItem}>
                novo item
            </button>
        </>
    );
};