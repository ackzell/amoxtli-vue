import servor from 'servor';

const styles = `
<style>
:root {
    --bg-light: whitesmoke;
    --bg-dark: #101010;
    --text-light: #101010;
    --text-dark: whitesmoke;
}

body {
    background: var(--bg-light);
    color: var(--text-light);
    transition: background 0.3s, color 0.3s;
}

@media (prefers-color-scheme: dark) {
    body {
        background: var(--bg-dark);
        color: var(--text-dark);
    }
}
</style>
`;

export async function start() {
  await servor({
    root: process.cwd(),
    port: 3000,
    reload: true,
    inject: styles,
  });
}

start();
