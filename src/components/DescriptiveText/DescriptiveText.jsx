import { useContext } from 'react';
import styled from 'styled-components';
import { Stack, Typography } from '@mui/material';

import { DescriptiveTextContext } from '../../utils/DescriptiveTextContext';

const DescriptiveText = ({ text, width, maxWidth, top, left, l, tl, tr, bl }) => {
    const { isDescriptiveText } = useContext(DescriptiveTextContext);

    if (!isDescriptiveText) {
        return null;
    }

    if (text) {
        return (
            <Stack
                sx={{
                    position: 'absolute',
                    top,
                    left,
                    width: width || 'none',
                    maxWidth: maxWidth || 'none',
                }}
            >
                {l && (
                    <WrapperL>
                        <Typography variant="body3" align="center">
                            {text}
                        </Typography>
                    </WrapperL>
                )}
                {tl && (
                    <WrapperTL>
                        <Typography variant="body3" align="center">
                            {text}
                        </Typography>
                    </WrapperTL>
                )}
                {tr && (
                    <WrapperTR>
                        <Typography variant="body3" align="center">
                            {text}
                        </Typography>
                    </WrapperTR>
                )}
                {bl && (
                    <WrapperBL>
                        <Typography variant="body3" align="center">
                            {text}
                        </Typography>
                    </WrapperBL>
                )}
            </Stack>
        );
    }
};

export default DescriptiveText;

const WrapperL = styled.div`
    position: relative;
    width: 100%;
    padding: 10px;
    background-color: #edf9d9;
    border-radius: 10px;
    box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.3);
    z-index: 999;

    &:before {
        content: '◀';
        position: absolute;
        left: -13px;
        top: calc(50% - 10px);
        display: inline-block;
        transform: scale(2, 3);
        color: #edf9d9;
        text-shadow: -2px 1px 1px rgba(0, 0, 0, 0.02);
        font-size: 16px;
    }
`;

const WrapperBL = styled.div`
    position: relative;
    width: 100%;
    padding: 10px;
    background-color: #edf9d9;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.3);
    z-index: 999;

    &:before {
        content: '◤';
        position: absolute;
        left: 8px;
        bottom: -17px;
        display: inline-block;
        transform: scaleX(2);
        color: #edf9d9;
        text-shadow: 0 0 3px rgba(255, 255, 255, 0.5), 0 4px 3px rgba(0, 0, 0, 0.2);
        font-size: 16px;
    }
`;

const WrapperTL = styled.div`
    position: relative;
    width: 100%;
    padding: 10px;
    background-color: #edf9d9;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0px -4px 14px -4px rgba(0, 0, 0, 0.5);
    z-index: 999;

    &:before {
        content: '◣';
        position: absolute;
        left: 6px;
        top: -16px;
        display: inline-block;
        transform: scaleX(2);
        color: #edf9d9;
        text-shadow: 0 0 3px rgba(255, 255, 255, 0.5), 0 0 4px rgba(0, 0, 0, 0.5);
        font-size: 11px;
    }

    &:after {
        content: '◣';
        position: absolute;
        left: 8px;
        top: -17px;
        display: inline-block;
        transform: scaleX(2);
        color: #edf9d9;
        //text-shadow: 0 0 3px rgba(255, 255, 255, 0.5), 0 4px 3px rgba(0, 0, 0, 0.5);
        font-size: 16px;
    }
`;

const WrapperTR = styled.div`
    position: relative;
    width: 100%;
    padding: 10px;
    background-color: #edf9d9;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0px -4px 14px -4px rgba(0, 0, 0, 0.5);
    z-index: 999;

    &:before {
        content: '◢';
        position: absolute;
        left: calc(100% - 17px);
        top: -16px;
        display: inline-block;
        transform: scaleX(2);
        color: #edf9d9;
        text-shadow: 0 0 3px rgba(255, 255, 255, 0.5), 0 0 4px rgba(0, 0, 0, 0.5);
        font-size: 11px;
    }

    &:after {
        content: '◢';
        position: absolute;
        left: calc(100% - 24px);
        top: -17px;
        display: inline-block;
        transform: scaleX(2);
        color: #edf9d9;
        //text-shadow: 0 0 3px rgba(255, 255, 255, 0.5), 0 4px 3px rgba(0, 0, 0, 0.5);
        font-size: 16px;
    }
`;
