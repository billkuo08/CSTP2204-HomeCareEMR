import { Typography, Box, Stack } from "@mui/material";
import { TreeItem, TreeView } from '@mui/x-tree-view';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from "react";
import CreateUserPage from "./CreateUserPage";
import HomeComponent from "../components/HomeComponent";
const ShowComponent = (props) => {
  console.log(props);
  const {childre, activeTree, selectedTree} = props;
  console.log("act", activeTree);
  console.log("sel", selectedTree); 
  console.log("child", childre);
  return (
  <div>
    {activeTree !== selectedTree? <HomeComponent/> : <Box mx={2}>{childre}</Box>}
  </div>
  );
}
const MuiTreeView = () => {
    const [activeTree, setActiveTree] = useState('1');

      const handleSelect = (event, selectedTree) => {
            setActiveTree(selectedTree);
        };
    return(
        <Box>
            
            <Stack spacing={3} direction ="row">
                <Box width="20%">
                    <TreeView
                        aria-label="file system navigator"
                        defaultExpandIcon={<ExpandMoreIcon />}
                        defaultCollapseIcon={<ChevronRightIcon />}                    
                        onNodeSelect={handleSelect}
                    >
                    <TreeItem nodeId="1" label="Manage User">
                        <TreeItem nodeId="Create User" label="Create User" />
                        <TreeItem nodeId="User List"  label="User List" />
                        <TreeItem nodeId="Nurse List" label="Nurse List" />
                    </TreeItem>
                    <TreeItem nodeId="5" label="Manage Patients">
                        <TreeItem nodeId="10" label="Create Patient" onClick={()=> window.location.pathname = '/createpatient'}/>
                        <TreeItem nodeId="6" label="Patients List" onClick={()=> window.location.pathname = '/patients'}/>          
                    </TreeItem>
                    {/* <TreeItem nodeId='7' label='Log out' onClick={handleLogOut} /> */}
                    </TreeView>
                </Box>
                <Box width="80%">

                    <ShowComponent childre={<CreateUserPage/>} activeTree={activeTree} selectedTree="Create User"/>
                </Box>
            </Stack>
        </Box>
    )
}

export default MuiTreeView;