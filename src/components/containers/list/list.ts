import Control from '../../elements/control';
import ListItem from './listItem';

export default class List extends Control {
  private items: Array<Control> = [];

  constructor(parent: HTMLElement | null, children: Array<Control>) {
    super(parent, 'ul', 'list', '');
    children.forEach(child => {
      this.items.push(new ListItem(this.node, child));
    });
  }
}
