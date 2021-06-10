import Control from '../../elements/control';
import Link from '../../elements/link/link';
import Paragraph from '../../elements/paragraph/paragraph';
import Nav from '../nav/nav';
import './style.css';

export default class Footer extends Control {
  constructor(parent?: HTMLElement) {
    super(parent, 'footer', 'footer');

    const rssLink = new Link(
      null,
      'https://rs.school/',
      'footer-nav__link footer-nav__link_rss',
    );
    const instagramLink = new Link(
      null,
      'https://www.instagram.com/',
      'footer-nav__link footer-nav__link_instagram',
    );
    const vkLink = new Link(
      null,
      'https://vk.com/',
      'footer-nav__link footer-nav__link_vk',
    );
    const twitterLink = new Link(
      null,
      'https://twitter.com/',
      'footer-nav__link footer-nav__link_twitter',
    );

    const nav = new Nav(this.node, [
      rssLink,
      instagramLink,
      vkLink,
      twitterLink,
    ]);
    nav.getNode().className = 'footer-nav';

    const year = new Paragraph(this.node, 'footer-nav__year', '2021');
  }
}
