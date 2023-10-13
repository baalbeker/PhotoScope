import {IconButton,useColorMode } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

    return (
        <IconButton
            position="fixed"
            top={4}
            right={4}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            size="md"
            aria-label="Toggle dark mode"
          />
    )
}

export default ThemeButton