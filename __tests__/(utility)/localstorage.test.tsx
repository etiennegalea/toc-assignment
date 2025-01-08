import { saveToLocalStorage, getFromLocalStorage } from "@/(utils)/localstorage";

describe('LocalStorage', () => {
  
  it('should save and load data from localStorage', () => {
    const key = 'testKey';
    const value = {name: 'John', age: 30};

    saveToLocalStorage(key, value);
    const savedData = getFromLocalStorage(key);
    expect(savedData).toEqual(value);
  });
});