import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import appColors, { type AppColors } from "@/constants/colors";

export function useColors() {
  const scheme = useColorScheme();

  const getColors = () =>
    scheme === "dark" ? appColors.dark : appColors.light;

  const [colors, setColors] = useState<AppColors>(getColors());

  useEffect(() => {
    setColors(getColors());
  }, [scheme]);

  return colors;
}
