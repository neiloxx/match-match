import Control from '../control';

export default class Paragraph extends Control {
  constructor(parent: HTMLElement | null, className = '', content = '') {
    super(parent, 'p', className, content);
  }
}
