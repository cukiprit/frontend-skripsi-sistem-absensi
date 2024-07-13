export function formatDateString(dateString) {
  let dateParts;

  // Check if the dateString contains '/' or '-'
  if (dateString.includes("/")) {
    dateParts = dateString.split("/");
  } else if (dateString.includes("-")) {
    dateParts = dateString.split("-");
  } else {
    throw new Error("Invalid date format");
  }

  if (dateParts.length !== 3) {
    throw new Error("Invalid date format");
  }

  let day, month, year;

  if (dateParts[0].length === 4) {
    // YYYY-MM-DD
    year = dateParts[0];
    month = dateParts[1].padStart(2, "0");
    day = dateParts[2].padStart(2, "0");
  } else {
    // DD/MM/YYYY
    day = dateParts[0].padStart(2, "0");
    month = dateParts[1].padStart(2, "0");
    year = dateParts[2];
  }

  // Check if year, month, and day are valid numbers
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error("Invalid date values");
  }

  // Create a new date string in the format YYYY-MM-DD
  return `${year}-${month}-${day}`;
}
