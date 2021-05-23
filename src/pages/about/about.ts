import Control from '../../components/elements/control';
import GridField from '../../components/containers/grid-field/gridField';
import GridItem from '../../components/containers/grid-field/gridItem';
import Paragraph from '../../components/elements/paragraph/paragraph';
import Img from '../../components/elements/img/img';
import './style.css';

export default class About extends Control {
  title: Control;

  grid: GridField;

  constructor(parent: HTMLElement | null) {
    super(parent, 'main', 'main');
    this.title = new Control(this.node, 'h2', 'main__title', 'How to play?');
    this.grid = new GridField(
      this.node,
      [
        new GridItem(
          null,
          [new Paragraph(null, 'grid__text', 'Register new player in game')],
          'grid__item text',
        ),
        new GridItem(
          null,
          [
            new Img(
              null,
              'grid__image',
              './assets/images/register-preview.jpg',
              'Register preview',
            ),
          ],
          'grid__item img',
        ),
        new GridItem(
          null,
          [new Paragraph(null, 'grid__text', 'Configure your game settings')],
          'grid__item text',
        ),
        new GridItem(
          null,
          [
            new Img(
              null,
              'grid__image',
              './assets/images/settings-preview.jpg',
              'Settings preview',
            ),
          ],
          'grid__item img',
        ),
        new GridItem(
          null,
          [
            new Paragraph(
              null,
              'grid__text',
              'Start you new game! Remember card positions and match it before times up.',
            ),
          ],
          'grid__item text',
        ),
        new GridItem(
          null,
          [
            new Img(
              null,
              'grid__image',
              './assets/images/game-preview.jpg',
              'Game preview',
            ),
          ],
          'grid__item img',
        ),
      ],
      'about__grid',
    );
  }
}
