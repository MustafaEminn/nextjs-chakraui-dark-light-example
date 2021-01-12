import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../theme/index";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCss theme={theme}>
      <ColorModeScript initialColorMode="system" />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
