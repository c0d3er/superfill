'use babel';

import SuperfillView from './superfill-view';
import { CompositeDisposable } from 'atom';

export default {

  superfillView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.superfillView = new SuperfillView(state.superfillViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.superfillView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'superfill:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.superfillView.destroy();
  },

  serialize() {
    return {
      superfillViewState: this.superfillView.serialize()
    };
  },

  toggle() {
    console.log('Superfill was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
