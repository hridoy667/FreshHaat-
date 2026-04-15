// src/hooks/useDistricts.ts
import { useState, useEffect } from 'react';
import { District } from '@/types/districts';
import { fetchDistricts } from '@/service/districts.service';

export const useDistricts = () => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchDistricts();
        // Optional: Sort them so Dhaka/Chattogram are easier to find
        const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
        setDistricts(sorted);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load districts');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { districts, loading, error };
};