import './index.css';
import registerServiceWorker from './registerServiceWorker';

document.getElementById('app').innerHTML = `
  <h1>Welcome to <code>yaml-json-repl</code>.</h1>
  <a href="https://github.com/remarkablemark/yaml-json-repl">
    View source
  </a>
`;

registerServiceWorker();
