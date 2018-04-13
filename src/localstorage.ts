export const loadState = () => {
  try {
    const localizedState = localStorage.getItem('state');
    return !!localizedState ? JSON.parse(localizedState) : undefined;
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    console.log(error.message);
  }
};
