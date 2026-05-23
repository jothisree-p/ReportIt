const DEFAULT_CITIZEN = {
  fullName: "Jothisree",
  email: "jothisree@example.com",
  phone: "",
};

export const getCurrentCitizen = () => {
  const currentCitizen = readJson("currentCitizen");
  if (currentCitizen) return currentCitizen;

  const citizenData = readJson("citizenData");
  if (citizenData) return citizenData;

  return DEFAULT_CITIZEN;
};

export const setCurrentCitizen = (citizen) => {
  localStorage.setItem("currentCitizen", JSON.stringify(citizen));
  return citizen;
};

export const getCitizenName = (citizen = getCurrentCitizen()) =>
  citizen.fullName || citizen.name || DEFAULT_CITIZEN.fullName;

export const getCitizenInitials = (citizen = getCurrentCitizen()) =>
  getCitizenName(citizen)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "CT";

export const getCitizenWelcomeText = (citizen = getCurrentCitizen()) =>
  `Welcome back, ${getCitizenName(citizen)} !`;

const readJson = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};
