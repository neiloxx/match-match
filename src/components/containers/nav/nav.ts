import Control from '../../elements/control';

export default class Nav extends Control {
  constructor(parent: HTMLElement | null, children: Array<Control>) {
    super(parent, 'nav', 'nav');
    children.forEach(child => {
      child.setParent(this.node);
    });
  }
}
