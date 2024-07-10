export type AppColors = {
  border: string;
  focusedBorder: string;
  appBackground: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  subtleBackground: string;
  invertedPrimaryTextColor: string;
  shadow: string;
};

type Colors = {
  dark: AppColors;
  light: AppColors;
};

const colors: Colors = {
  light: {
    border: "#e6e6e6",
    focusedBorder: "#c6c6c6",
    appBackground: "#ffffff",
    primaryTextColor: "#212126",
    secondaryTextColor: "#747686",
    subtleBackground: "#f7f7f8",
    invertedPrimaryTextColor: "#ffffff",
    shadow: "#121212",
  },
  dark: {
    border: "#e6e6e6",
    focusedBorder: "#c6c6c6",
    appBackground: "#ffffff",
    primaryTextColor: "#212126",
    secondaryTextColor: "#747686",
    subtleBackground: "#f7f7f8",
    invertedPrimaryTextColor: "#ffffff",
    shadow: "#121212",
  },
};

export default colors;
