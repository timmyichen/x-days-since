import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const hostname = dev ? 'localhost' : process.env.HOST;
const port = Number(process.env.PORT) || 8080;
const nextApp = next({ dev, hostname, port })

export const prepareNextApp = async () => {
  await nextApp.prepare();

  return nextApp;
}
