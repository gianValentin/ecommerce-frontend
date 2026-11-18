import { buildCategoryTree } from '@/utils/categoryTree';

describe('buildCategoryTree', () => {
  it('groups flat categories by parentId and supports multiple levels', () => {
    const categories = [
      { id: 1, name: 'Electrónica', parentId: null },
      { id: 2, name: 'Computadoras', parentId: 1 },
      { id: 3, name: 'Portátiles', parentId: 2 },
    ];

    expect(buildCategoryTree(categories)).toEqual([
      {
        ...categories[0],
        children: [{
          ...categories[1],
          children: [{ ...categories[2], children: [] }],
        }],
      },
    ]);
  });

  it('accepts nested subCategories returned by the API', () => {
    const categories = [{
      id: 1,
      name: 'Hogar',
      subCategories: [{ id: 2, name: 'Cocina' }],
    }];

    expect(buildCategoryTree(categories)[0].children[0]).toMatchObject({
      id: 2,
      name: 'Cocina',
      children: [],
    });
  });
});
