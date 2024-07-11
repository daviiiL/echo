// ... (Your Sequelize setup from above)

// Function to create a tag and associate it with an article
async function createTagAndAssociate(articleId, tagName) {
  try {
    // 1. Find or create the tag (case-insensitive)
    const [tag, created] = await Tag.findOrCreate({
      where: { name: { [Op.iLike]: tagName } },
      defaults: { name: tagName },
    });

    // 2. Add the tag to the article
    await article.addTag(tag);

    console.log(
      created ? "New tag created and associated." : "Existing tag associated.",
    );
  } catch (error) {
    console.error("Error creating tag and association:", error);
  }
}

// Example Usage
const articleId = 123; // Replace with the actual article ID
const tagName = "NewTag";

createTagAndAssociate(articleId, tagName);
