import React from "react";

interface EmojiProps {
  alt: string;
  emoji: string;
}

const Emoji: React.FC<EmojiProps> = ({ alt, emoji }) => (
  <span role="img" aria-label={alt}>
    {emoji}
  </span>
);

export default Emoji;
