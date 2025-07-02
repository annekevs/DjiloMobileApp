import { useEffect } from 'react';
import { router } from 'expo-router';

export default function AuthIndex() {
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = false; // This would come from your auth state
    
    if (isAuthenticated) {
      router.replace('/(tabs)');
    } else {
      router.replace('/auth/login');
    }
  }, []);

  return null;
}