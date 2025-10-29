export const genUserName = () => {
  const usernamePrefix = 'user_';
  const randomSuffix = Math.random().toString(36).substring(2);
  return usernamePrefix + randomSuffix;
};

// This function genSlug generates a random slug from a title by removing special characters, replacing spaces with hyphens, and appending a random string.
export const genSlug = (title: string): string => {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]\s-/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const randomSuffix = Math.random().toString(36).slice(2);

  return `${slug}-${randomSuffix}`;
};
