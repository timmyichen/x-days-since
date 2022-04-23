import { usePageState } from '@/client/contexts/page'
import { getFormattedDate } from '@/client/lib/date'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import React from 'react'

const PAGE_SIZE = 10

const EventsTable: React.FC = () => {
  const { pages, currentPage } = usePageState()
  const [tablePage, setTablePage] = React.useState(0)

  const handleChangePage = (_event: unknown, newPage: number) => {
    setTablePage(newPage);
  };

  const page = pages[currentPage!]

  const events = page.events.slice(tablePage * PAGE_SIZE, (tablePage + 1) * PAGE_SIZE)

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small">
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '60%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map(event => (
              <TableRow key={event.date}>
                <TableCell>{getFormattedDate(event.date, page.meta.dateFormat)}</TableCell>
                <TableCell>{event.note || ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        rowsPerPage={PAGE_SIZE}
        count={page.events.length}
        page={tablePage}
        onPageChange={handleChangePage}
      />
    </>
  )
}

export default EventsTable
