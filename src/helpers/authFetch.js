export const authFetch = async (route, data) => {
  const response = await fetch(`/api/auth/${route}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const user = await response.json();
  return user;
};
