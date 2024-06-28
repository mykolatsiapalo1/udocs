import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import OrderTable from '../components/OrderTable';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress } from '@mui/joy';

export default function Deliverables() {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (!isAuthenticated && !isLoading) loginWithRedirect()
    }, [isAuthenticated, isLoading])

    return (
        <>
            {
                !isLoading && isAuthenticated
                    ?
                    <CssVarsProvider disableTransitionOnChange>

                        <CssBaseline />
                        <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                            <Header />
                            <Sidebar />
                            <Box
                                component="main"
                                className="MainContent"
                                sx={{
                                    px: { xs: 2, md: 6 },
                                    pt: {
                                        xs: 'calc(12px + var(--Header-height))',
                                        sm: 'calc(12px + var(--Header-height))',
                                        md: 2,
                                    },
                                    pb: { xs: 2, sm: 2, md: 3 },
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    minWidth: 0,
                                    height: '100dvh',
                                    gap: 1,
                                }}
                            >
                                <OrderTable />
                            </Box>
                        </Box>
                    </CssVarsProvider>
                    : <Box sx={{
                        width: "100vw",
                        height: "100dvh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <CircularProgress
                            determinate={false}
                            size="md"
                            value={25}
                            variant="soft"
                        />
                    </Box>
            }</>
    );
}
