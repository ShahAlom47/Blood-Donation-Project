import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react"; 
import AllBloodRequest from "../Componets/Admin/AllBloodRequest";

const AdminHome = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabStyle = {
        borderRadius: '6px 6px 0px 0px',
        padding: "4px 10px",
        fontWeight: '600',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        textTransform: 'none',
        '&.Mui-selected': {
            backgroundColor: '#ea062b',
            color: 'white',
        },
    };

    return (
        <div>
            <div className="my-5">
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        className="border-b-2 border-color-p mb-8"
                        value={value}
                        onChange={handleChange}
                        aria-label="dashboard tabs"
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '& .MuiTabs-scrollButtons': {
                                display: 'flex',
                            },
                            '& .MuiTabs-scrollButtons button': {
                                color: '#ea062b', // Customize arrow color
                            },
                        }}
                        TabIndicatorProps={{
                            style: {
                                display: 'none'
                            }
                        }}
                    >
                        <Tab sx={tabStyle} label="All Blood Request" />
                        <Tab sx={tabStyle} label="My Donation History" />
                        <Tab sx={tabStyle} label="Tab 3" />
                        <Tab sx={tabStyle} label="Tab 4" />
                        <Tab sx={tabStyle} label="Tab 5" />
                        <Tab sx={tabStyle} label="Tab 6" />
                    </Tabs>

                    {value === 0 && <Box><AllBloodRequest></AllBloodRequest> </Box>}
                    {value === 1 && <Box>Content for Tab 2</Box>}
                    {value === 2 && <Box>Content for Tab 3</Box>}
                    {value === 3 && <Box>Content for Tab 4</Box>}
                    {value === 4 && <Box>Content for Tab 5</Box>}
                    {value === 5 && <Box>Content for Tab 6</Box>}
                </Box>
            </div>
        </div>
    );
};

export default AdminHome;
