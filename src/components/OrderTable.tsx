import React, { useState, useEffect } from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import useDeliverables from './hooks/useDeliverables';
import { CircularProgress } from '@mui/joy';
import { DeliverableItemType } from '../types/allTypes';

import docx_image from "../assets/docs.svg"
import pptx_image from "../assets/pptx.svg"

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        {/* <MoreHorizRoundedIcon /> */}
        <EllipsisHorizontalIcon style={{ width: "20px" }} />
      </MenuButton>
      {/* <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu> */}
    </Dropdown>
  );
}

export default function OrderTable() {
  const { getListDeliverables } = useDeliverables()
  const [rowsData, setRowsData] = useState<DeliverableItemType[]>([])

  const handleGetListDeliverables = async () => {
    const res = await getListDeliverables()
    if (res.data) setRowsData(res.data)
  }

  useEffect(() => {
    handleGetListDeliverables()
  }, [])

  return (
    <React.Fragment>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for deliverable</FormLabel>
          <Input size="sm" placeholder="Search" sx={{ backgroundColor: "white" }} />
        </FormControl>
      </Box>

      {rowsData.length !== 0 ?
        <Sheet
          className="OrderTableContainer"
          variant="outlined"
          sx={{
            width: '100%',
            borderRadius: 'sm',
            flexShrink: 1,
            overflow: 'auto',
            minHeight: 0,

          }}
        >
          <Table
            aria-labelledby="tableTitle"
            stickyHeader
            hoverRow
            sx={{
              '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
              '--Table-headerUnderlineThickness': '1px',
              '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
              '--TableCell-paddingY': '4px',
              '--TableCell-paddingX': '8px',
              backgroundColor: "white"
            }}
          >
            <thead>
              <tr>
                <th style={{ flex: 1, padding: '12px 30px', background: "white" }}>Name</th>
                <th style={{ width: 100, padding: '12px 6px', background: "white" }}>Date</th>
                <th style={{ width: 80, padding: '12px 30px', background: "white" }}>By</th>
                <th style={{ width: 80, textAlign: "right", padding: '12px 6px', background: "white" }}> </th>
              </tr>
            </thead>
            <tbody>
              {rowsData.map((row: DeliverableItemType, index: number) => (
                <tr key={`TR_${index}`}>
                  <td style={{ padding: "15px" }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <img src={row.type === "docx" ? docx_image : pptx_image} />
                      <div>
                        <Typography level="body-xs">{row.Name}</Typography>
                      </div>
                    </Box>
                  </td>
                  <td>
                    <Typography level="body-xs" >{row.DateCreated}</Typography>
                  </td>
                  <td>
                    <Box sx={{ display: 'flex', pl: "18px" }}>
                      <Avatar size="sm">{row.createdBy.email[0]}</Avatar>
                    </Box>
                  </td>
                  <td>
                    <Box sx={{ display: 'flex', justifyContent: "flex-end" }}>
                      <RowMenu />
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
        :
        <Box sx={{
          width: "100%",
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
        </Box>}
    </React.Fragment>
  );
}
