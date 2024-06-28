import { Box, Button } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import logo from "../assets/logo.svg"

export default function HeaderSection() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: "100%",
        top: 0,
        px: 1.5,
        py: 1,
        zIndex: 10000,
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1.5,
         
        }}
      >
        <img src={logo} style={{padding: "0px 15px",}} />
        <Typography level="title-sm">Create Deliverable</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <Button
          sx={{ color: "black" }}
          variant="plain">Need Help?</Button>
      </Box>
    </Box>
  );
}
