import { useCallback, useLayoutEffect, useState, useRef } from "preact/hooks";
import ResizeObserver from "resize-observer-polyfill";

export default function useResizeObserver() {
    const [entry, setEntry] = useState({});
    const [node, setNode] = useState(null);
    const observer = useRef(null);
  
    const disconnect = useCallback(() => {
      const { current } = observer;
      current && current.disconnect();
    }, []);
  
    const observe = useCallback(() => {
      observer.current = new ResizeObserver(([entry]) => setEntry(entry));
      node && observer.current.observe(node);
    }, [node]);
  
    useLayoutEffect(() => {
      observe();
      return () => disconnect();
    }, [disconnect, observe]);
  
    return [setNode, entry];
  };