import * as React from 'react';
import './footer.scss';

export const Footer = () => (
  <footer className="Footer">
    <div className="Footer-social-media-wrapper">
      <a href="/" className="Footer-social-media-link">
        <i className="nc-icon nc-logo-twitter size_24px" />
      </a>
      <a href="/" className="Footer-social-media-link">
        <i className="nc-icon nc-logo-github size_24px" />
      </a>
    </div>
  </footer>
);
