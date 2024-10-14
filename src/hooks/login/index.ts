export const userCertification = async (data: { email: string }) => {
  const { email } = data;
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
