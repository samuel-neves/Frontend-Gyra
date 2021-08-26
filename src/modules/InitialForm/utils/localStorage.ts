export const setLocalStorage = (name: string): void => {
  localStorage.setItem('@GyraTest:Name', name);
};

export const removeLocalStorage = (): void => {
  localStorage.removeItem('@GyraTest:Name');
};

export const getLocalStorageBoolean = (): boolean => {
  return !!localStorage.getItem('GyraTest:Name');
};
