import {SvgIcon, Tooltip} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const TooltipIcon = ({tooltipText, pt='10px'}) => {
    return (
        <Tooltip title={tooltipText} placement="right">
            <SvgIcon
                component={InfoOutlinedIcon}
                sx={{ width: 28, height: 28 }}
                style={{ paddingTop: pt, fill: "#1665C1" }}
            />
        </Tooltip>
    )
}

export default TooltipIcon;

