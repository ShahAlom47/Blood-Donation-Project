import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react"; 
import MyBloodRequest from "./BloodRequest/MyBloodRequest";
import MoneyDonationHistory from "./MoneyDonationHistory/MoneyDonationHistory";
import PrivetRouter from "../../../Routes/PrivetRouter/PrivetRouter";
import BloodDonationHistory from "./BloodDonationHistory/BloodDonationHistory";

const UserHome = () => {
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
                        <Tab sx={tabStyle} label="My Blood Request" />
                        <Tab sx={tabStyle} label="Blood Donation History" />
                        <Tab sx={tabStyle} label="Money Donation History" />
                        <Tab sx={tabStyle} label="Tab 4" />
                        <Tab sx={tabStyle} label="Tab 5" />
                    </Tabs>

                    {value === 0 && <Box><PrivetRouter><MyBloodRequest></MyBloodRequest></PrivetRouter></Box>}
                    {value === 1 && <Box><PrivetRouter><BloodDonationHistory></BloodDonationHistory> </PrivetRouter></Box>}
                    {value === 2 && <Box><PrivetRouter><MoneyDonationHistory></MoneyDonationHistory></PrivetRouter></Box>}
                    {value === 3 && <Box>Loading.... . Under developing </Box>}
                    {value === 4 && <Box>Loading.... . Under developing </Box>}
                </Box>
            </div>
        </div>
    );
};

export default UserHome;
