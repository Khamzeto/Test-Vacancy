export const timeToMinutes = (time: string): number => {
  const [hh, mm] = time.split(':').map(Number);
  return hh * 60 + mm;
};
