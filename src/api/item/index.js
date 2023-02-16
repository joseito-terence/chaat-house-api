import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Item, { schema } from './model'

const router = new Router()
const { name, description, price, image } = schema.tree

/**
 * @api {post} /items Create item
 * @apiName CreateItem
 * @apiGroup Item
 * @apiParam name Item's name.
 * @apiParam description Item's description.
 * @apiParam price Item's price.
 * @apiParam image Item's image.
 * @apiSuccess {Object} item Item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item not found.
 */
router.post('/',
  body({ name, description, price, image }),
  create)

/**
 * @api {get} /items Retrieve items
 * @apiName RetrieveItems
 * @apiGroup Item
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of items.
 * @apiSuccess {Object[]} rows List of items.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /items/:id Retrieve item
 * @apiName RetrieveItem
 * @apiGroup Item
 * @apiSuccess {Object} item Item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /items/:id Update item
 * @apiName UpdateItem
 * @apiGroup Item
 * @apiParam name Item's name.
 * @apiParam description Item's description.
 * @apiParam price Item's price.
 * @apiParam image Item's image.
 * @apiSuccess {Object} item Item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item not found.
 */
router.put('/:id',
  body({ name, description, price, image }),
  update)

/**
 * @api {delete} /items/:id Delete item
 * @apiName DeleteItem
 * @apiGroup Item
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Item not found.
 */
router.delete('/:id',
  destroy)

export default router
