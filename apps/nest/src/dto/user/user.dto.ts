import z from 'zod';

export const registerField = z
  .object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmation: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password don't match, please check again",
      });
    }
  });

export type RegisterField = z.infer<typeof registerField>;

export const loginField = z.object({
  token: z.string(),
  password: z.string(),
});

export type LoginField = z.infer<typeof loginField>;
