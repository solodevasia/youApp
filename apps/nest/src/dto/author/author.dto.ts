import z from 'zod';

export const authorField = z.object({
  nickname: z.string(),
  birthday: z.string(),
  horoscope: z.string(),
  zodiac: z.string(),
  height: z.number(),
  weight: z.number(),
  interest: z.string(),
  about: z.string(),
});

export type AuthorField = z.infer<typeof authorField>;
