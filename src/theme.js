import { createTheme } from '@mui/material/styles';

export const materialTheme = createTheme({
    palette: {
        primary: { main: '#556B2F' },
    },
    typography: {
        fontFamily: [
            'Poppins',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: { fontSize: 26, fontWeight: 400, lineHeight: 1.5 },
        h2: { fontSize: 22, fontWeight: 500, lineHeight: 1.5 },
        h3: { fontSize: 18, fontWeight: 500, lineHeight: 1.5 },
        subtitle1: { fontSize: 14, fontWeight: 500, lineHeight: 1.5 },
        subtitle2: { fontSize: 14, fontWeight: 400, lineHeight: 1.1 },
        body1: { fontSize: 18, fontWeight: 400, lineHeight: 1.5 },
        body2: { fontSize: 16, fontWeight: 400, lineHeight: 1.5 },
        body3: { fontSize: 14, fontWeight: 400, lineHeight: 1.5 },

    },
    components: {
        MuiPaper: {
            styleOverrides: {
                rounded: { borderRadius: '12px' },
                elevation1: {
                    boxShadow: '0px 1px 15px rgba(0, 0, 0, 0.04), 0px 1px 6px rgba(0, 0, 0, 0.04)',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                h2: { fontSize: '24px', lineHeight: '1rem' },
                body2: { fontSize: '0.75rem', lineHeight: '1rem' },
                paragraph: { marginBottom: 0 },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    // height: '45px',
                    // borderRadius: 0,
                },
            },
        },
        MuiTableBody: {
            styleOverrides: {
                root: {
                    '& .MuiTableRow-root': {
                        backgroundColor: 'white',
                        boxShadow:
                            '0px 1px 15px rgba(0, 0, 0, 0.04), 0px 1px 6px rgba(0, 0, 0, 0.04)',
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: 500,
                },
                root: {
                    fontSize: 14,
                    lineHeight: '21px',
                    borderBottom: 'none',
                },
            },
        },
        // MuiPaginationItem: {
        //     styleOverrides: {
        //         root: {
        //             '&.Mui-selected': {
        //                 backgroundColor: 'transparent',
        //             },
        //         },
        //     },
        // },
    },
});

