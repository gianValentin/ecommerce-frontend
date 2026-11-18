function flattenCategories(categories) {
  const flattened = [];
  const seen = new Set();

  const visit = (items, inferredParentId = null) => {
    items?.forEach((category) => {
      if (!category || category.id == null || seen.has(String(category.id))) return;

      seen.add(String(category.id));
      flattened.push({ ...category, inferredParentId });
      visit(category.subCategories ?? category.children, category.id);
    });
  };

  visit(categories);
  return flattened;
}

export function buildCategoryTree(categories = []) {
  const flattenedCategories = flattenCategories(categories);
  const inferredParents = new Map(
    flattenedCategories.map((category) => [String(category.id), category.inferredParentId])
  );
  const nodes = new Map(
    flattenedCategories.map((category) => {
      const { inferredParentId, ...publicCategory } = category;
      return [String(category.id), { ...publicCategory, children: [] }];
    })
  );
  const roots = [];

  nodes.forEach((category) => {
    const parentId = category.parentId
      ?? category.parentCategoryId
      ?? category.parent?.id
      ?? category.parentCategory?.id
      ?? inferredParents.get(String(category.id));
    const parent = parentId == null ? null : nodes.get(String(parentId));

    if (parent && parent !== category) {
      parent.children.push(category);
    } else {
      roots.push(category);
    }
  });

  return roots;
}
