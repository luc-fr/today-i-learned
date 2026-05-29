import type { RefObject } from 'react';
import { useState } from 'react';

interface NewFactFormProps {
  inputRef: RefObject<HTMLInputElement | null>;
};

export default function NewFactForm({ inputRef }: NewFactFormProps) {
  const [text, setText] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const char = 200 - text.length;

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log({
      text,
      source,
      category
    });
  };

  interface handleTextProps {
    event: (
      React.ChangeEvent<HTMLInputElement> |
      React.ChangeEvent<HTMLSelectElement>
    );
    handle: (event: string) => void;
  };

  function handleText({ event, handle }: handleTextProps) {
    handle(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type='text'
          placeholder='compartilhe um fato com o mundo...'
          value={text}
          onChange={event => handleText({
            event,
            handle: setText
          })}
          maxLength={200}
        />
        <span>{char}</span>
        <input
          type='text'
          placeholder='fonte confiável'
          value={source}
          onChange={event => handleText({
            event,
            handle: setSource
          })}
        />
        <select
          value={category}
          onChange={event => handleText({
            event,
            handle: setCategory
          })}
        >
          <option value=''>escolha a categoria</option>
        </select>
        <button type='submit'>compartilhar</button>
      </form>
    </>
  );
};