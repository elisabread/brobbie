import React, { forwardRef } from "react";
import {
  useTab,
  useMultiStyleConfig,
  Button,
  Box,
  Image,
} from "@chakra-ui/react";
import clockblack from "../assets/icons/clockblack.svg";
import clockwhite from "../assets/icons/clockwhite.svg";
import penblack from "../assets/icons/penblack.svg";
import penwhite from "../assets/icons/penwhite.svg";

const generateCustomTab = (IconBlackSrc, IconWhiteSrc) => {
  return forwardRef(function CustomTab(props, ref) {
    const { borderRadius } = props;
    const tabProps = useTab({ ...props, ref });
    const isSelected = !!tabProps["aria-selected"];
    const styles = useMultiStyleConfig("Tabs", tabProps);

    return (
      <Button
        width={"full"}
        __css={styles.tab}
        {...tabProps}
        border={"1px solid #F9FFF6"}
        borderRadius={borderRadius}
        bg={"#A8D491"}
        color={"white"}
        _selected={{ color: "black", bg: "#F9FFF6" }}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box ml={"9px"}>
          <Image
            src={isSelected ? IconBlackSrc : IconWhiteSrc}
            alt="Tab Icon"
          />
        </Box>
      </Button>
    );
  });
};

const CustomTabComments = generateCustomTab(clockblack, clockwhite);
const CustomTabHistory = generateCustomTab(penblack, penwhite);

export { CustomTabComments, CustomTabHistory };
