const API_URL = "http://127.0.0.1:8000/api";

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

export const getMahasiswa = async () => {
  try {
    const response = await fetch(`${API_URL}/mahasiswa`);

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
    const response = await fetch(`${API_URL}/mahasiswa/${nim}`);
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
    const response = await fetch(`${API_URL}/mahasiswa`, {
      method: "POST",
      body: JSON.stringify(newMahasiswa),
      headers: {
        "Content-Type": "application/json",
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
    const response = await fetch(`${API_URL}/mahasiswa/${nim}`, {
      method: "DELETE",
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
    const response = await fetch(`${API_URL}/mahasiswa/${nim}`, {
      method: "PUT",
      body: JSON.stringify(newMahasiswa),
      headers: {
        "Content-Type": "application/json",
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

export const getAbsensi = async () => {
  try {
    const response = await fetch(`${API_URL}/absensi`);

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
    const response = await fetch(`${API_URL}/absensi`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    const response = await fetch(`${API_URL}/absensi/export`, {
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
