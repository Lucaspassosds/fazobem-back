import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const getAuthTokenExpiryTime = (days: number) => {
  const now = new Date();
  const expiryTime = new Date(now.getTime() + days * 86400000);
  return expiryTime;
};
