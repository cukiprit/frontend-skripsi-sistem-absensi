const API_URL = "http://127.0.0.1:8000/api/mahasiswa";
const token = localStorage.getItem("token");

export const getMahasiswa = async () => {
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

export const getMahasiswaByID = async (nim) => {
  try {
    const response = await fetch(`${API_URL}/${nim}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
    });
    console.log("Response:", response);
    if (!response.ok) {
      throw new Error(`An error occured: ${response.statusText}`);
    }

    const mahasiswa = await response.json();
    console.log("Mahasiswa Data:", mahasiswa);
    return mahasiswa;
  } catch (err) {
    throw new Error(`Failed to fetch mahasiswa by NIM: ${err.message}`);
  }
};

export const addMahasiswa = async (newMahasiswa) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      body: JSON.stringify(newMahasiswa),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`An error occured: ${response.statusText}`);
    }

    const data = await response.json();

    return data.data;
  } catch (err) {
    throw new Error(`Error: ${err.message}`);
  }
};

export const deleteMahasiswa = async (nim) => {
  try {
    const response = await fetch(`${API_URL}/${nim}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`An error occured: ${response.statusText}`);
    }

    const data = response.json();

    return data;
  } catch (err) {
    throw new Error(`Error: ${err.message}`);
  }
};

export const updateMahasiswa = async (nim, newMahasiswa) => {
  try {
    const response = await fetch(`${API_URL}/${nim}`, {
      method: "PUT",
      body: JSON.stringify(newMahasiswa),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`An error occured: ${response.statusText}`);
    }

    const data = await response.json();

    console.log(data);

    return data;
  } catch (err) {
    throw new Error(`Error: ${err.message}`);
  }
};
