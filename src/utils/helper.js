export function saveToLocalStorage(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export function getFromLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name)) ?? [];
}
