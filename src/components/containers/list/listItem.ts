import Control from '../../elements/control';

export default class ListItem extends Control {
  constructor(parent: HTMLElement | null = null, child: Control) {
    super(parent, 'li', 'list__item', '');
    child.setParent(this.node);
  }
}
