const comments = [
        {
            "id": 1,
            "parent_article": 1,
            "parent_comment": null,
            "commenter_id": null,
            "body": "This comment has been deleted.",
            "reaction": null,
            "upvote": 0,
            "downvote": 0,
            "createdAt": "2024-07-17T07:46:36.838Z",
            "updatedAt": "2024-07-17T07:53:20.883Z",
            "User": null,
            "parent": null
        },
        {
            "id": 2,
            "parent_article": 1,
            "parent_comment": 1,
            "commenter_id": 4,
            "body": "Thank you for testing out the threaded comment feature! I am replying to your comment, Demo.",
            "reaction": null,
            "upvote": 0,
            "downvote": 0,
            "createdAt": "2024-07-17T07:46:36.840Z",
            "updatedAt": "2024-07-17T07:46:36.840Z",
            "User": {
                "first_name": "Spidy",
                "last_name": "Man",
                "username": "Spidey",
                "id": 4,
                "last_active": "2024-07-17T07:46:36.000Z"
            },
            "parent": {
                "id": 1,
                "parent_article": 1,
                "parent_comment": null,
                "commenter_id": null,
                "body": "This comment has been deleted.",
                "reaction": null,
                "upvote": 0,
                "downvote": 0,
                "createdAt": "2024-07-17T07:46:36.838Z",
                "updatedAt": "2024-07-17T07:53:20.883Z",
                "User": null
            }
        },
        {
            "id": 3,
            "parent_article": 1,
            "parent_comment": null,
            "commenter_id": null,
            "body": "This comment has been deleted.",
            "reaction": null,
            "upvote": 0,
            "downvote": 0,
            "createdAt": "2024-07-17T07:47:44.295Z",
            "updatedAt": "2024-07-17T08:00:16.929Z",
            "User": null,
            "parent": null
        },
        {
            "id": 4,
            "parent_article": 1,
            "parent_comment": 2,
            "commenter_id": null,
            "body": "This comment has been deleted.",
            "reaction": null,
            "upvote": 0,
            "downvote": 0,
            "createdAt": "2024-07-17T07:47:58.125Z",
            "updatedAt": "2024-07-17T07:48:04.292Z",
            "User": null,
            "parent": {
                "id": 2,
                "parent_article": 1,
                "parent_comment": 1,
                "commenter_id": 4,
                "body": "Thank you for testing out the threaded comment feature! I am replying to your comment, Demo.",
                "reaction": null,
                "upvote": 0,
                "downvote": 0,
                "createdAt": "2024-07-17T07:46:36.840Z",
                "updatedAt": "2024-07-17T07:46:36.840Z",
                "User": {
                    "first_name": "Spidy",
                    "last_name": "Man",
                    "username": "Spidey",
                    "id": 4,
                    "last_active": "2024-07-17T07:46:36.000Z"
                }
            }
        }, 
        {id: 5, parent_comment: 4}
    ]


function sortCommentsPreorder(comments) {
  const result = [];
  const map = {};

  // Create a map for efficient parent lookups
  for (const comment of comments) {
    map[comment.id] = { ...comment, children: [] }; // Add 'children' property
  }

  // Build the comment tree
  for (const comment of comments) {
    if (comment.parent_comment !== null) {
      map[comment.parent_comment].children.push(map[comment.id]);
    }
  }

  // Recursive function for preorder traversal
  function preorderTraversal(comment) {
    result.push(comment);
    for (const child of comment.children) {
      preorderTraversal(child);
    }
  }

  // Start the traversal from root comments (no parent_comment)
  for (const comment of comments) {
    if (comment.parent_comment === null) {
      preorderTraversal(map[comment.id]);
    }
  }

  return result; // Return the sorted array of comments
}

// Example usage
const sortedComments = sortCommentsPreorder(comments);
console.log(sortedComments); // Output the sorted comments

function flattenComments(comments) {  
  const sortedComments = sortCommentsPreorder(comments); // Get the pre-ordered comments

  const flattened = [];

  // Recursive function to flatten the tree
  function flatten(comment) {
    flattened.push(comment);
    for (const child of comment.children) {
      flatten(child);
    }
  }

  // Start flattening from the root comments
  for (const comment of sortedComments) {
    if (comment.parent_comment === null) {
      flatten(comment);
    }
  }

  return flattened;
}

// Example usage
const flattenedComments = flattenComments(comments);
console.log(flattenedComments);
