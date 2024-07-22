import './app.css'
import App from './App.svelte'
import App2 from './App2.svelte'
import { inject } from '@vercel/analytics';
 
inject({ mode: 'production' });

let url_object = new URL(window.location.href);
let url = url_object.href;

console.log(url);

let app = new App({
  target: document.getElementById('app'),
})

if (url.includes("theme?cleantechies")) {
  app = new App2({
    target: document.getElementById('app'),
  })
}

export default app
