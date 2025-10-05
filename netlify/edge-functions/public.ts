// dummy "allow" edge function
export default async (request: Request) => {
  return; // let Netlify serve content without auth
};
