import { useEffect, useRef, useState } from "react";
import DetectArea from "./components/DetectArea";
import Box from "./components/Box";

const App = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const [boxComps, setBoxComps] = useState([
    <Box />,
    <Box />,
    <Box />,
    <Box />,
    <Box />,
  ]);

  const detectAreaRef = useRef();
  const observer = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setScrollPosition(window.scrollY / 2);

          setBoxComps([
            ...boxComps,
            <Box />,
            <Box />,
            <Box />,
            <Box />,
            <Box />,
          ]);
        }
      },
      { threshold: 0 }
    );

    observer.current.observe(detectAreaRef.current);

    return () => observer.current.unobserve(detectAreaRef.current);
  }, []);

  const scrollEvent = () => {
    console.log(window.scrollY);
  };

  useEffect(() => {
    const watch = () => window.addEventListener("scroll", scrollEvent);

    watch();

    return () => window.removeEventListener("scroll", scrollEvent);
  }, []);

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  return (
    <ul className="flex flex-col items-center gap-20">
      {boxComps.map((v, i) => (
        <li key={i}>{v}</li>
      ))}
      <DetectArea detectAreaRef={detectAreaRef} />
    </ul>
  );
};

export default App;
