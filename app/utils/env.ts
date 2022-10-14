const getEnvValue = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing: process.env['${name}'].`);
  }

  return value;
};

const SUPABASE_URL = getEnvValue("SUPABASE_URL");
const SUPABASE_TOKEN = getEnvValue("SUPABASE_TOKEN");

export { SUPABASE_URL, SUPABASE_TOKEN };
