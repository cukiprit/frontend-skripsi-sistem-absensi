const API_URL = "http://127.0.0.1:8000/api/absensi";
const token = localStorage.getItem("token");

export const recognizeFace = async (imageData) => {
  try {
    const formData = new FormData();
    formData.append("file", imageData);

    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`An error occured: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Error: ${err.message}`);
  }
};

export const getAbsensi = async () => {
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

    const absensi = await response.json();

    return absensi;
  } catch (err) {
    throw new Error(`Error: ${err.message}`);
  }
};

export const addAbsensi = async (absensi) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify(absensi),
    });

    if (!response.ok) {
      throw new Error(`An error occured: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Error: ${err.message}`);
  }
};

export const exportAsExcel = async () => {
  try {
    const response = await fetch(`${API_URL}/export`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to export absensi as Excel");
    }

    return response;
  } catch (err) {
    throw new Error(`Error: ${err.message}`);
  }
};

export const leaderboard = async () => {
  try {
    const response = await fetch(`${API_URL}/leaderboard`);

    if (!response.ok) {
      throw new Error(`An error occured: ${response.statusText}`);
    }

    const leaderboard = await response.json();

    return leaderboard;
  } catch (err) {
    throw new Error(`Error: ${err.message}`);
  }
};
