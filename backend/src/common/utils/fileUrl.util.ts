export function generateAvatarUrl(filename: string): string {
  const baseUrl = process.env.BACKEND_URL || 'http://localhost:5000';

  return `${baseUrl}/public/avatars/${filename}`;
}
