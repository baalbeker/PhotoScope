import {IconButton,useColorMode } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
// import wow from '../../assets/wow.mp3'

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
    // const audio = new Audio(wow);
    const toggle = () => {
      // audio.play();
      toggleColorMode()
    };

    return (
        <IconButton
            position="fixed"
            top={2}
            left={5}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggle}
            size="sm"
            aria-label="Toggle dark mode"
          />
    )
}

export default ThemeButton