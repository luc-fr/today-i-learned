import type { RefObject } from 'react';
import { useState } from 'react';
import { factSchema } from '../schemas';
import { CATEGORIES } from '../constants';

interface NewFactFormProps {
  inputRef: RefObject<HTMLInputElement | null>;
};

export default function NewFactForm({ inputRef }: NewFactFormProps) {
  const [text, setText] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const char = 200 - text.length;

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = factSchema.safeParse({
      text,
      source,
      category
    });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    };

    setErrors({});
    console.log(result.data);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type='text'
          placeholder='compartilhe um fato com o mundo...'
          value={text}
          onChange={event => setText(event.target.value)}
          maxLength={200}
        />
        <span>{char}</span>
        {errors.text?.[0] && <span>{errors.text[0]}</span>}
        <input
          type='text'
          placeholder='fonte confiável'
          value={source}
          onChange={event => setSource(event.target.value)}
        />
        {errors.source?.[0] && <span>{errors.source[0]}</span>}
        <select
          value={category}
          onChange={event => setCategory(event.target.value)}
        >
          <option value=''>escolha a categoria</option>
          {CATEGORIES.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        {errors.category?.[0] && <span>{errors.category[0]}</span>}
        <button type='submit'>compartilhar</button>
      </form>
    </>
  );
};