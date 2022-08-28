import Container  from '@mui/material/Container'
import Grid  from '@mui/material/Grid'
import Box  from '@mui/material/Box'
import Link  from '@mui/material/Link'



export default function Footer(){

    return(
        <footer justifyContent="center">
            <Box px={{ xs: 3, sm:8 }} py={{xs: 5 , sm:10 }} backgroundColor="#9999" >
                <Container>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Help</Box>
                            <Box>
                                <Link href="/" color="inherit" underline="none">
                                    Contact
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit" underline="none">
                                    Support
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit" underline="none">
                                    Privacy
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Account</Box>
                            <Box>
                                <Link href="/login" color="inherit" underline="none">
                                    Login
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit" underline="none">
                                    Register
                                </Link>
                            </Box> 
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Messages</Box>
                            <Box>
                                <Link href="/" color="inherit" underline="none">
                                    Backup
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit" underline="none">
                                    History
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit" underline="none">
                                    Roll
                                </Link>
                            </Box>
                        </Grid>
                    </Grid> 

                </Container>
            </Box>
        </footer>
    )



}