import React from "react";
import PropTypes from "prop-types";

// node_modules/gatsby/dist/utils/eslint-config.js

function Emoji({ alt, emoji }) {
  return (
    <span role="img" aria-label={alt}>
      {emoji}
    </span>
  );
}

Emoji.propTypes = {
  alt: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
};

export default Emoji;
