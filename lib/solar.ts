// Constants
const deg2rad = (deg: number) => (deg * Math.PI) / 180;
const rad2deg = (rad: number) => (rad * 180) / Math.PI;

// Function to calculate the sun's position
const calculateSunPosition = (latitude: number, longitude: number, date: Date) => {
  // Implementation details for SPA here

  // Example return with dummy data
  return {
    azimuth: 180, // Degrees
    elevation: 45, // Degrees
  };
};

// Example usage
const latitude = 40.7128; // New York
const longitude = -74.0060; // New York
const date = new Date();

const sunPosition = calculateSunPosition(latitude, longitude, date);
console.log(`Azimuth: ${sunPosition.azimuth}, Elevation: ${sunPosition.elevation}`);

