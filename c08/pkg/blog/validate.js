const BlogCreate = {
  title: "required|string",
  content: "required|string",
  user_id: "required|string",
};

const BlogUpdate = {
  title: "string",
  content: "string",
  user_id: "string",
};

module.exports = { BlogCreate, BlogUpdate };
