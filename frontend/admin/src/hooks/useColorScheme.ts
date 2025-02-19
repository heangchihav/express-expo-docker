import { useContext } from "react";
import { Appearance } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";

const { theme } = useContext(ThemeContext); 
export const colorScheme = theme === 'system' ? Appearance.getColorScheme() : theme;