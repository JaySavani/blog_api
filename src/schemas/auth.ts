import { z } from 'zod';

export const Zlogin = z.object({
  body: z.object({
    email: z.email(),
    password: z.string(),
    role: z.enum(['user', 'admin'], 'Role is not valid').default('user'),
  }),
});

export type Zlogin = z.infer<typeof Zlogin>['body'];

export const Zregister = z.object({
  body: z.object({
    email: z.email(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(100, "Password can't be longer than 100 characters"),
    role: z.enum(['user', 'admin'], 'Role is not valid').default('user'),
  }),
});
export type Zregister = z.infer<typeof Zregister>['body'];

// Custom JWT pattern check (very basic)
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

export const ZrefreshToken = z.object({
  cookies: z.object({
    refreshToken: z
      .string('Refresh token is required')
      .min(1, 'Refresh token is required')
      .regex(jwtRegex, 'Invalid refresh token'),
  }),
});

export type ZrefreshToken = z.infer<typeof ZrefreshToken>['cookies'];
