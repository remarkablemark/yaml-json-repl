import './index.css';
import registerServiceWorker from './registerServiceWorker';
const { CodeMirror, jsyaml } = window;

/**
 * Shared editor options.
 *
 * @const {Object}
 */
const editorOptions = {
  inputStyle: 'contenteditable',
  lineNumbers: true,
  lineWrapping: true,
  styleActiveLine: true,
  tabSize: 2,
  theme: 'default',
};

/**
 * YAML CodeMirror editor on the left (editable).
 *
 * @const {Object}
 */
const editor1 = CodeMirror.fromTextArea(document.getElementById('editor1'), {
  ...editorOptions,
  autofocus: true,
  mode: 'yaml',
});

/**
 * JSON CodeMirror editor on the left (readonly).
 *
 * @const {Object}
 */
const editor2 = CodeMirror.fromTextArea(document.getElementById('editor2'), {
  ...editorOptions,
  mode: 'javascript',
  readOnly: true,
});

/**
 * Add extra keys to YAML editor.
 *
 * @const {Object}
 */
editor1.setOption('extraKeys', {
  /**
   * Subtracts 2 spaces.
   *
   * @see {@link https://gist.github.com/danieleds/326903084a196055a7c3 Gist}
   * @param {CodeMirror} cm
   */
  'Shift-Tab': cm => {
    cm.indentSelection('subtract');
  },

  /**
   * Indents with 2 spaces instead of tab.
   *
   * @see {@link https://gist.github.com/danieleds/326903084a196055a7c3 Gist}
   * @param {CodeMirror} cm
   */
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

/**
 * Converts YAML to JSON on editor change and displays errors if applicable.
 */
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
