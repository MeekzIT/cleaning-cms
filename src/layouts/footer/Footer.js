import React from 'react';
import "../sidebar/sidebar.scss"
import CopyrightIcon from '@mui/icons-material/Copyright';
const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()
    return (
        <div className="footerBox">
          <CopyrightIcon/>MEEKZ-IT {year}
        </div>
    );
};

export default Footer;