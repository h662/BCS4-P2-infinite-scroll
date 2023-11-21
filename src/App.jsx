import { useEffect, useRef, useState } from "react";
import DetectArea from "./components/DetectArea";
import Box from "./components/Box";

const App = () => {
  const [count, setCount] = useState(6);

  const [boxComps, setBoxComps] = useState([
    <Box count={1} />,
    <Box count={2} />,
    <Box count={3} />,
    <Box count={4} />,
    <Box count={5} />,
  ]);

  const detectAreaRef = useRef();
  const observer = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setBoxComps([
          ...boxComps,
          <Box count={count} />,
          <Box count={count + 1} />,
          <Box count={count + 2} />,
          <Box count={count + 3} />,
          <Box count={count + 4} />,
        ]);

        setCount(count + 5);
      }
    });

    observer.current.observe(detectAreaRef.current);

    return () => observer.current.unobserve(detectAreaRef.current);
  }, [boxComps]);

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
