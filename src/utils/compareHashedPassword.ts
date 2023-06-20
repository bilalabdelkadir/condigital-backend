import * as bcrypt from 'bcrypt';

async function comparePassword(
  password: string,
  hashed: string,
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashed);

  return isMatch;
}

export default comparePassword;
