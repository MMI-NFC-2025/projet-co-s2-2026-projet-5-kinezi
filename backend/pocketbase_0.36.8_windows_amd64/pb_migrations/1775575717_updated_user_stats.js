/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1261808738")

  // remove field
  collection.fields.removeById("text2807860234")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number2326406872",
    "max": null,
    "min": null,
    "name": "streak_days",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text574523253",
    "max": 0,
    "min": 0,
    "name": "rank_tier",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number3540871428",
    "max": null,
    "min": null,
    "name": "experience_points",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1261808738")

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2807860234",
    "max": 0,
    "min": 0,
    "name": "fgjd",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("number2326406872")

  // remove field
  collection.fields.removeById("text574523253")

  // remove field
  collection.fields.removeById("number3540871428")

  return app.save(collection)
})
