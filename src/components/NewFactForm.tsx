import type { RefObject } from 'react';
import { useState } from 'react';
import { factSchema } from '../schemas';
import { CATEGORIES } from '../constants';
import { supabase } from '../supabaseClient';

interface NewFactFormProps {
  inputRef: RefObject<HTMLInputElement | null>;
  onAddFact: () => Promise<void>;
};

export default function NewFactForm({ inputRef, onAddFact }: NewFactFormProps) {
  const [text, setText] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const char = 200 - text.length;

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
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
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('facts')
        .insert([{
          text,
          source,
          category
        }])
        .select();

        if (error) return setSubmitError('Não foi possível compartilhar um fato. Tente novamente.');

        setText('');
        setSource('');
        setCategory('');

        await onAddFact();
    } finally {
      setIsSubmitting(false)
    }
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
              disabled={isSubmitting}
              className="w-full h-[53.6px] bg-stone-500 rounded-full p-4 border-none text-[18px] disabled:opacity-50"
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
            disabled={isSubmitting}
            className="w-full h-[53.6px] bg-stone-500 rounded-full p-4 border-none text-[18px] disabled:opacity-50"
          />
          {errors.source?.[0] && <span className="text-red-500 text-[14px]">{errors.source[0]}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <select
            value={category}
            onChange={event => setCategory(event.target.value)}
            disabled={isSubmitting}
            className="h-[53.6px] bg-stone-500 rounded-full p-4 border-none text-[18px] capitalize disabled:opacity-50"
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
          disabled={isSubmitting}
          className="h-14.25 bg-linear-[135deg,#3b82f6,#ef4444,#16a34a,#eab308] text-[20px] pt-5 px-8 pb-4.25 btn disabled:opacity-50 disabled:scale-100 disabled:rotate-0"
        >{isSubmitting ? 'enviando...' : 'compartilhar'}</button>
      </form>
      {submitError && <p className="text-red-500 text-[14px] mb-4">{submitError}</p>}
    </>
  );
};