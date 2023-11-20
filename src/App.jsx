import { useEffect, useRef } from "react";

import A from "./components/A";
import B from "./components/B";
import C from "./components/C";
import D from "./components/D";
import Header from "./components/Header";

const App = () => {
  const bRef = useRef();
  const observer = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      console.log(entries[0].isIntersecting);
    });

    observer.current.observe(bRef.current);
  }, []);

  return (
    <>
      <Header />
      <A />
      <B bRef={bRef} />
      <C />
      <D />
    </>
  );
};

export default App;
