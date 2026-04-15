// src/service/location.service.ts
import { apiRequest } from '@/lib/api-client';
import { District } from '@/types/districts';

export const fetchDistricts = async () => {
  // We just tell apiRequest which endpoint to hit
  return apiRequest<District[]>('/districts');
};