import React from "react";
import Typewriter from "typewriter-effect";

const JumboTron = (props) => {
  const { text } = props;
  return (
    <Typewriter
      options={{
        strings: text,
        autoStart: true,
        loop: true,
      }}
    />
  );
};

export default JumboTron;
