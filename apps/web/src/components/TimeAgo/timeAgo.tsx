import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';

/* eslint-disable-next-line */
export interface TimeAgoProps {
  timestamp: string;
}

export function TimeAgo({ timestamp }: TimeAgoProps) {
  let timeAgo = '';
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
}

export default TimeAgo;
