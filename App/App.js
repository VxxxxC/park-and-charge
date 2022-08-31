import React from "react";
import { NativeBaseProvider, Box, Flex, Spacer } from "native-base";
import Head from "./src/head";
import Footer from "./src/footer";
import Body from "./src/body";

export default function App() {
  return (
    <NativeBaseProvider>
      <Box flexGrow="1" justifyContent="center">
        <Head />
        <Body />
        <Footer />
      </Box>
    </NativeBaseProvider>
  );
}
