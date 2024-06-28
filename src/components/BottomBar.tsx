import { Box, Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

interface BottomBarType {
  onGenerate: () => void
}

export default function BottomBar({ onGenerate }: BottomBarType) {
  const navigate = useNavigate()

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
        borderTop: '1px solid',
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
        <Button
          onClick={() => navigate("/")}
          sx={{ color: "black" }}
          variant="plain">Back</Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Button
          onClick={onGenerate}
          variant="solid"
        >Generate</Button>
      </Box>
    </Box>
  );
}
