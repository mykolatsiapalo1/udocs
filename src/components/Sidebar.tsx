import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { ListBulletIcon, RectangleGroupIcon } from '@heroicons/react/24/outline'

import { closeSidebar } from '../utils';
import { Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.svg"
import { useAuth0 } from '@auth0/auth0-react';


export default function Sidebar() {
  const navigate = useNavigate()
  const { user } = useAuth0();

  const handleNavigateToCreateReport = () => {
    navigate("/createReport")
  }

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />

      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            p: 2,
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <img src={logo} style={{ padding: "20px 0px" }} />

          <ListItem sx={{ justifyContent: "center" }}>
            <Button onClick={handleNavigateToCreateReport}>
              <RectangleGroupIcon style={{ width: "18px", paddingRight: "4px" }} type="outline" />
              Create Report
            </Button>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListBulletIcon style={{ width: "18px" }} />
              <ListItemContent>
                <Typography level="title-sm">Deliverables</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', p: 2, borderTop: '1px solid', borderColor: 'var(--joy-palette-divider)' }}>
        <Avatar
          variant="outlined"
          size="sm"
          src={user!.picture}
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            level="title-sm"
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden"
            }}
          >{user!.given_name} {user!.family_name}</Typography>
          <Typography
            level="body-xs" sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden"
            }}>{user!.email}</Typography>
        </Box>
      </Box>
    </Sheet>
  );
}
