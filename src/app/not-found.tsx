'use client'; // Error boundaries must be Client Components

import { Button, Title, Text } from '@mantine/core';
import Link from 'next/link';

export default function Error() {
  return (

    <section className="flex h-screen w-screen items-center justify-center flex-col gap-4">
      <Title fw={900} style={{ fontSize: '62px' }} order={1}>
        404: Page Not Found!
      </Title>
      <Text c={'#53545C'} fw={500}>Oops! The page you’re looking for doesn’t exist or may have been moved.</Text>
      <div className="flex gap-4">

        <Link href="/chat" passHref>
          <Button color='#21749E'>Go Back To Homepage</Button>
        </Link>
      </div>
    </section>
  );
}