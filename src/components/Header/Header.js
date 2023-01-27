import {Box, Grid, Typography} from "@mui/material";

const Header = () => {
    return (
        <Box sx={{px: 10, backgroundColor: "#ffffff", boxShadow: "0px 1px 15px rgba(0, 0, 0, 0.04)"}}>
            <Grid container justifyContent="flex-end" alignItems="center" sx={{width: "100%", height: "80px"}}>
                <Typography variant="h3">
                    John Smith
                </Typography>
            </Grid>
        </Box>
    )
};

export default Header;


