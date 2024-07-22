import './app.css'
import App from './routes/+page.svelte'
import { inject } from '@vercel/analytics';
 
inject({ mode: 'production' });

const app = new App({
  target: document.getElementById('app'),
})

export default app
