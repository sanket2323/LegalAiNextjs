'use client';

import { Button } from '@/components/ui/button';
import { signInWithGoogle } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

export function LoginButton() {
  const router = useRouter();

  
  return (
    <Button variant="link" className="-ml-2" onClick={handleLogin}>
      Login
    </Button>
  );
}