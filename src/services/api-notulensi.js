const API_URL = "http://127.0.0.1:8000/api/notulensi";
const token = localStorage.getItem("token");

export const getNotulensi = async () => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`An error occured: ${response.statusText}`);
    }

    const mahasiswa = await response.json();

    return mahasiswa;
  } catch (err) {
    throw new Error(`Failed to fetch mahasiswa: ${err.message}`);
  }
};
