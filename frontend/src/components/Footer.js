import React from "react";

function Footer() {
  return (
    <div className="Footer">
      <footer className="footer">
        <span className="footer__copyright">{`© ${new Date().getFullYear()} Mesto Russia`}</span>
      </footer>
    </div>
  );
}
export default Footer;
