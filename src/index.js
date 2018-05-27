import { addClass, removeClass, capitalize } from './helpers';
import classes from './styles.css';
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
  theme: 'default',
};

/**
 * YAML CodeMirror editor instance (left).
 *
 * @const {Object}
 */
const editor1 = CodeMirror.fromTextArea(document.getElementById('editor1'), {
  ...editorOptions,
  autofocus: true,
  gutters: ['CodeMirror-lint-markers'],
  lint: true,
  mode: 'yaml',
  styleActiveLine: true,
  tabSize: 2,
});

/**
 * JSON CodeMirror editor instance (right).
 *
 * @const {Object}
 */
const editor2 = CodeMirror.fromTextArea(document.getElementById('editor2'), {
  ...editorOptions,
  mode: 'javascript',
  readOnly: true,
});

/**
 * JSON CodeMirror editor element.
 *
 * @const {HTMLDivElement}
 */
const editor2Element = editor2.getWrapperElement();

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
 * Convert YAML to JSON on editor change and display errors if thrown.
 */
editor1.on('change', cm => {
  const value = cm.getValue();
  if (!value.trim()) {
    removeClass(editor2Element, classes.error);
    editor2.setValue('');
    return;
  }

  try {
    const js = jsyaml.load(cm.getValue());
    const json = JSON.stringify(js, null, 2);
    removeClass(editor2Element, classes.error);
    editor2.setValue(json);
  } catch (error) {
    addClass(editor2Element, classes.error);
    editor2.setValue(capitalize(error.message));
  }
});

registerServiceWorker();
