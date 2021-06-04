import Control from '../../elements/control';
import List from '../list/list';
import Nav from '../nav/nav';
import Link from '../../elements/link/link';
import Logo from '../../elements/logo/logo';
import './style.css';
import Img from '../../elements/img/img';

export default class Header extends Control {
  logo: Control;

  title: Control;

  nav: Control;

  registrationLink: Control;

  startLink: Control;

  stopLink: Control;

  avatar: Img;

  constructor(parent: HTMLElement | null) {
    super(parent, 'header', 'header', '', 'onTop');
    this.logo = new Logo(this.node, 'header__logo logo');
    this.title = new Control(this.node, 'h1', 'header__title', 'Match-match');
    this.nav = new Nav(this.node, [
      new List(null, [
        new Link(null, '#', 'list__item-link about', 'about game', true),
        new Link(null, '#score', 'list__item-link score', 'best score', true),
        new Link(
          null,
          '#settings',
          'list__item-link settings',
          'game settings',
          true,
        ),
      ]),
    ]);
    this.registrationLink = new Link(
      this.node,
      '#registration',
      'link registration-link',
      'register new player',
    );
    this.startLink = new Link(this.node, '#start', 'link start-link', 'start');
    this.stopLink = new Link(this.node, '#about', 'link stop-link', 'stop');
    this.avatar = new Img(this.node, 'header__avatar');
    this.startLink.getNode().onclick = () => {
      this.startLink.getNode().classList.remove('available');
      this.stopLink.getNode().classList.add('available');
    };
    this.stopLink.getNode().onclick = () => {
      this.startLink.getNode().classList.add('available');
      this.stopLink.getNode().classList.remove('available');
    };
  }
}
