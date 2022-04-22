import React, { Component } from 'react';
import '../sass/components/Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="Footer">
        <p>
          Desenvolvido em React por
          {' '}
          <a href="https://github.com/raphaelalmeidamartins">Raphael Martins</a>
        </p>
      </footer>
    );
  }
}

export default Footer;
