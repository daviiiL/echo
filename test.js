const comments = [
  {
    id: 1,
    parent_comment: null,
  },
  {
    id: 3,
    parent_comment: 1,
  },
  {
    id: 6,
    parent_comment: null,
  },
  {
    id: 7,
    parent_comment: 3,
  },
  { id: 10, parent_comment: 6 },
];

function constructCommentTree(arr) {
  const unrootedArr = arr.reduce((acc, el, ind) => {
    const comment = { ...el, children: [] }; //the original object is immutable. so...
    if (comment.parent_comment === null) comment.parent_comment = 0; //since multiplle root comments, need another root to combine subtrees
    acc.push(comment);
    return acc;
  }, []);
  unrootedArr.unshift({ id: 0, parent_comment: null, children: [] }); //add root to tree node arr
  const indexMapping = unrootedArr.reduce((acc, el, ind) => {
    acc[el.id] = ind;
    return acc;
  }, {});
  let root;
  unrootedArr.forEach((e, _, arr) => {
    if (e.parent_comment === null) {
      root = e;
      return;
    }
    // console.log(e.parent_comment);
    const parentIndex = indexMapping[e.parent_comment];
    const parentComment = arr[parentIndex];
    parentComment.children = [...parentComment.children, e];
  });
  return root;
}

function flattenPreOrder(node) {
  const result = [];

  function traverse(node) {
    if (!node) return;
    result.push(node);

    if (node.children?.length) {
      for (const child of node.children) {
        traverse(child);
      }
    }
  }

  traverse(node);
  return result;
}

console.log(flattenPreOrder(constructCommentTree(comments)));
