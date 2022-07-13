export function toTree(paths) {
  let tree = [];
  paths.forEach(path => {
    path = { ...path };
    path.key = path.key.split(".");
    let currentPath = tree;
    path.key.forEach((key, idx) => {
      let index = currentPath.findIndex(item => item.name === key);
      if (index === -1) {
        currentPath.push({
          name: key,
          children: []
        });
        index = currentPath.length - 1;
      }
      if (idx === path.key.length - 1) {
        currentPath[index] = { ...currentPath[index], ...path };
        return;
      }
      currentPath = currentPath[index].children;
    });
  });
  return tree;
}
