import React, { useState, useEffect } from 'react';

export interface SocketAlertProps {
  message: string;
  receivedAt: Date;
}

export function SocketAlert({ message, receivedAt }: SocketAlertProps) {
  const [isShow, setIsShow] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsShow(true);

    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      setIsShow(false);
    }, 5000);
    setTimer(newTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedAt]);

  return (
    <div className="fixed bottom-5 right-5">
      {isShow && (
        <div className="p-3 text-gray-700 text-base bg-indigo-200 rounded">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default SocketAlert;
