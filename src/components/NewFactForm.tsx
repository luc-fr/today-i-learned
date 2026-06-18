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
      <form
        onSubmit={handleSubmit}
        className="mb-10 bg-stone-700 px-8 py-4 rounded-2xl flex gap-4 justify-between items-start"
      >
        <div className="flex flex-col flex-1 gap-2 mr-4.5">
          <div className="flex w-full gap-4 items-center">
            <input
              ref={inputRef}
              type='text'
              placeholder='Compartilhe um fato com o mundo...'
              value={text}
              onChange={event => setText(event.target.value)}
              maxLength={200}
              className="w-full h-[53.6px] bg-stone-500 rounded-full p-4 border-none text-[18px]"
            />
            <span>{char}</span>
          </div>
          {errors.text?.[0] && <span className="text-red-500 text-[14px]">{errors.text[0]}</span>}
        </div>
        <div className="flex flex-col w-55 gap-2">
          <input
            type='text'
            placeholder='Fonte confiável'
            value={source}
            onChange={event => setSource(event.target.value)}
            className="w-full h-[53.6px] bg-stone-500 rounded-full p-4 border-none text-[18px]"
          />
          {errors.source?.[0] && <span className="text-red-500 text-[14px]">{errors.source[0]}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <select
            value={category}
            onChange={event => setCategory(event.target.value)}
            className="h-[53.6px] bg-stone-500 rounded-full p-4 border-none text-[18px] capitalize"
          >
            <option value=''>Escolha a categoria:</option>
            {CATEGORIES.map(category => (
              <option
                key={category.value}
                value={category.value}
                className="capitalize"
              >
                {category.label}
              </option>
            ))}
          </select>
          {errors.category?.[0] && <span className="text-red-500 text-[14px]">{errors.category[0]}</span>}
        </div>
        <button
          type='submit'
          className="h-14.25 bg-linear-[135deg,#3b82f6,#ef4444,#16a34a,#eab308] text-[20px] pt-5 px-8 pb-4.25 btn"
        >compartilhar</button>
      </form>
    </>
  );
};