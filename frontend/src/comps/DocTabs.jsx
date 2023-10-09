import { TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { CustomTabComments, CustomTabHistory } from "./CustomTab"; // Import dynamically generated components
import Comments from "./Comments";
import EditHistory from "./EditHistory";

export default function DocTabs() {
  const renderTabPanel = (Component) => (
    <TabPanel p={0} h={"full"}>
      {Component}
    </TabPanel>
  );

  return (
    <Tabs variant="unstyled" h={"full"}>
      <TabList>
        <CustomTabComments borderRadius="15px 0 0 0" />
        <CustomTabHistory borderRadius="0 15px 0 0" />
      </TabList>
      <TabPanels h={"calc(100% - 39px)"} borderRadius={"0 0 25px 25px"}>
        {renderTabPanel(<Comments />)}
        {renderTabPanel(<EditHistory />)}
      </TabPanels>
    </Tabs>
  );
}
