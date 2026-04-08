import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

type Orientamento = "portrait" | "landscape";

function getOrientamento(): Orientamento {
  const { width, height } = Dimensions.get("window");
  return width > height ? "landscape" : "portrait";
}

export function useOrientamento(): Orientamento {
  const [orientamento, setOrientamento] = useState<Orientamento>(getOrientamento);

  useEffect(() => {
    const listener = Dimensions.addEventListener("change", ({ window }) => {
      setOrientamento(window.width > window.height ? "landscape" : "portrait");
    });
    return () => listener.remove();
  }, []);

  return orientamento;
}
