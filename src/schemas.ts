import { z } from 'zod';

export const factSchema = z.object({
  text: z
    .string()
    .min(1, 'O fato não pode estar vazio.')
    .max(200, 'O fato deve ter no máximo 200 caracteres.'),
  source: z
    .string()
    .url('A fonte deve ser uma URL válida.'),
  category: z
    .string()
    .min(1, 'Selecione uma categoria.')
});

export type FactFormData = z.infer<typeof factSchema>;