const API_URL = "http://127.0.0.1:8000/api";

export const login = async (credentials) => {
  const token = btoa(`${credentials.username}:${credentials.password}`);
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      // body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`An error occured: ${response.statusText}`);
    }

    const data = await response.json();
    return token;
  } catch (err) {
    throw new Error(`An error occured: ${err.message}`);
  }
};
