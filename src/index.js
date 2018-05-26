import './index.css';
import registerServiceWorker from './registerServiceWorker';
const { CodeMirror, jsyaml } = window;

const editorOptions = {
  inputStyle: 'contenteditable',
  lineNumbers: true,
  lineWrapping: true,
  styleActiveLine: true,
  tabSize: 2,
  theme: 'default',
};

const editor1 = CodeMirror.fromTextArea(document.getElementById('editor1'), {
  ...editorOptions,
  autofocus: true,
  mode: 'yaml',
});

const editor2 = CodeMirror.fromTextArea(document.getElementById('editor2'), {
  ...editorOptions,
  mode: 'javascript',
  readOnly: true,
});

// indent with spaces instead of tabs
// https://gist.github.com/danieleds/326903084a196055a7c3
editor1.setOption('extraKeys', {
  'Shift-Tab': cm => cm.indentSelection('subtract'),

  Tab: cm => {
    const selection = cm.somethingSelected() ? editor1.getSelection('\n') : '';
    if (
      (selection.length && selection.indexOf('\n') !== -1) ||
      selection.length === cm.getLine(cm.getCursor().line).length
    ) {
      return cm.indentSelection('add');
    }

    editor1.execCommand('insertSoftTab');
  },
});

editor1.on('change', cm => {
  const value = cm.getValue();
  if (!value.trim()) {
    return editor2.setValue('');
  }

  try {
    const js = jsyaml.load(cm.getValue());
    const json = JSON.stringify(js, null, 2);
    editor2.setValue(json);
  } catch (error) {
    editor2.setValue(`${error.name}: ${error.message}`);
  }
});

registerServiceWorker();
