import './index.css';
import registerServiceWorker from './registerServiceWorker';
const { CodeMirror } = window;

const editorOptions = {
  inputStyle: 'contenteditable',
  lineNumbers: true,
  lineWrapping: true,
  styleActiveLine: true,
  tabSize: 2,
  theme: 'default',
};

const editor = CodeMirror.fromTextArea(document.getElementById('editor1'), {
  ...editorOptions,
  autofocus: true,
  mode: 'yaml',
});

// indent with spaces instead of tabs
// https://gist.github.com/danieleds/326903084a196055a7c3
editor.setOption('extraKeys', {
  'Shift-Tab': cm => cm.indentSelection('subtract'),

  Tab: cm => {
    const selection = cm.somethingSelected() ? editor.getSelection('\n') : '';
    if (
      (selection.length && selection.indexOf('\n') !== -1) ||
      selection.length === cm.getLine(cm.getCursor().line).length
    ) {
      return cm.indentSelection('add');
    }

    editor.execCommand('insertSoftTab');
  },
});

CodeMirror.fromTextArea(document.getElementById('editor2'), {
  ...editorOptions,
  mode: 'javascript',
  readOnly: true,
});

registerServiceWorker();
