import { Box, Divider, HStack, Select, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import bold from "../assets/icons/bold.svg";
import italic from "../assets/icons/italic.svg";
import underline from "../assets/icons/underline.svg";
import color from "../assets/icons/color.svg";

export default function TextMenu({ onSelectFont, onSelectFontSize }) {
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [selectedFontSize, setSelectedFontSize] = useState("14px"); // Default font size

  const handleFontChange = (e) => {
    const newFont = e.target.value;
    setSelectedFont(newFont);
    onSelectFont(newFont);
  };

  const handleFontSizeChange = (e) => {
    const newFontSize = e.target.value;
    setSelectedFontSize(newFontSize);
    onSelectFontSize(newFontSize);
  };

  return (
    <HStack
      bg={"#F9FFF6"}
      w={"full"}
      borderRadius={"15px 15px 0 0"}
      justifyContent={"space-between"}
      px={"2rem"}
    >
      <HStack>
        <Box className="fonts">
          <style>
            {`
            .selectFont {
              font-family: ${selectedFont};
            }
          `}
          </style>
          <Select
            w={"12rem"}
            className="selectFont"
            padding={"1rem"}
            variant={"unstyled"}
            value={selectedFont}
            onChange={handleFontChange}
          >
            <option value="Arial">Arial</option>
            <option value="Courier">Courier</option>
            <option value="Times New Roman">Times New Roman</option>
          </Select>
        </Box>
        <Box h={"25px"}>
          <Divider orientation={"vertical"} borderColor={"#A8A6A6"} />
        </Box>
        <Box className="fontsizes">
          <Select
            padding={"1rem"}
            variant={"unstyled"}
            value={selectedFontSize}
            onChange={handleFontSizeChange}
          >
            <option value="12px">12</option>
            <option value="14px">14</option>
            <option value="16px">16</option>
            <option value="20px">20</option>
            <option value="24px">24</option>
          </Select>
        </Box>
        <Box h={"25px"}>
          <Divider orientation={"vertical"} borderColor={"#A8A6A6"} />
        </Box>
        <Box className="textchoices" px={"1rem"}>
          <HStack gap={5}>
            <Image src={bold} />
            <Image src={italic} />
            <Image src={underline} />
            <Image src={color} />
          </HStack>
        </Box>
      </HStack>
    </HStack>
  );
}
