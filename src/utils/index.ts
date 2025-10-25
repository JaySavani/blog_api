export const genUserName = () => {
  const usernamePrefix = 'user_';
  const randomSuffix = Math.random().toString(36).substring(2);
  return usernamePrefix + randomSuffix;
};
