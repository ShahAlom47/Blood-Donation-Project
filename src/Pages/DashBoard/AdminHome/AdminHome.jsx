import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react"; 

const AdminHome = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabStyle = {
        borderRadius: '0px 0px 6px 6px',
        padding:"4px 10px",
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
                        className="border-t-2 border-color-p mb-8"
                        value={value}
                        onChange={handleChange}
                        aria-label="dashboard tabs"
                        TabIndicatorProps={{
                            style: {
                                display: 'none'
                            }
                        }}
                    >
                        <Tab className="px-3" sx={tabStyle} label="My Blood Request" />
                        <Tab sx={tabStyle} label="My Donation History" />
                        <Tab sx={tabStyle} label="Tab 3" />
                    </Tabs>

                    {value === 0 && <Box>Content for Tab 1</Box>}
                    {value === 1 && <Box>Content for Tab 2</Box>}
                    {value === 2 && <Box>Content for Tab 3</Box>}
                </Box>
            </div>
        </div>
    );
};

export default AdminHome;
