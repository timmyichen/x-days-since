import { DateFormat } from '@/shared/models';
import { NoSsr } from '@mui/material';
import React from 'react'
import useTimeAgo from '@/client/hooks/useTimeAgo';

interface Props {
  timestamp: number;
  dateFormat: DateFormat;
}

const TimeAgo: React.FC<Props> = ({ timestamp, dateFormat }) => {
  const timeAgo = useTimeAgo(dateFormat, timestamp)

  return <NoSsr>{timeAgo}</NoSsr>
}

export default TimeAgo
