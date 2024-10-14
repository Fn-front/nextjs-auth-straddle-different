export const userCertification = async (email: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_URL + 'api/certification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  const result = res.json();

  return result;
};
