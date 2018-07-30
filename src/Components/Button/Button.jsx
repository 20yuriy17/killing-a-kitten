import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.css';

const Button = ({type, text, onClick}) => (
  <button type={type} className={styles.btn} onClick={onClick}>{text}</button>

);

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: null,
  onClick: () => '',
}

export default Button;
