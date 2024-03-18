'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

const errorMessages = {
  'Network Error': 'There was a network issue. Please try again later.',
  'Database Error': 'Could not connect to the database. Please try again later.',
  'Unable to fetch forms': 'Unable to fetch forms. Please try again later.',
  default: 'Something went wrong!',
};

const ErrorPage = ({ error }) => {
  const errorMessage = errorMessages[error.message] || errorMessages['default'];

  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-4">
      <h2 className="text-destructive text-4xl">{errorMessage}</h2>
      <Button asChild>
        <Link href={'/'}>Go back to home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
