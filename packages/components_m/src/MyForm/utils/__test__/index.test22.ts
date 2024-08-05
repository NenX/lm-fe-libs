import { getFormData, } from '../';

describe('test generateObjectByPath', () => {
  it('see result', () => {
    const data = { age: { value: 29, path: '.age' } };
    const result = getFormData(data);
    console.log(result);
  });
});
