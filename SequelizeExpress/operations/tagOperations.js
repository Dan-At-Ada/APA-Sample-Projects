const { Tag } = require("../models")

// Logging function
const log = (message) => console.log(`[Operations] [Tag] ${message}`)

async function getAllTags() {
  log("Fetching all tags")
  const tags = await Tag.findAll()
  log(`Fetched ${tags.length} tags`)
  return tags
}

async function createTag(tagData) {
  log("Creating new tag")
  const { name } = tagData
  const tag = await Tag.create({ name })
  log(`Created tag with ID: ${tag.id}`)
  return tag
}

module.exports = {
  getAllTags,
  createTag,
}

