import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, destroy } from './controller'
import { schema } from './model'
export Orders, { schema } from './model'

const router = new Router()
const { ordered_by, status, items } = schema.tree

/**
 * @api {post} /orders Create orders
 * @apiName CreateOrders
 * @apiGroup Orders
 * @apiParam ordered_by Orders's ordered_by.
 * @apiParam status Orders's status.
 * @apiParam items Orders's items.
 * @apiSuccess {Object} orders Orders's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Orders not found.
 */
router.post('/',
  body({ ordered_by, status, items }),
  create)

/**
 * @api {get} /orders Retrieve orders
 * @apiName RetrieveOrders
 * @apiGroup Orders
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of orders.
 * @apiSuccess {Object[]} rows List of orders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /orders/:id Retrieve orders
 * @apiName RetrieveOrders
 * @apiGroup Orders
 * @apiSuccess {Object} orders Orders's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Orders not found.
 */
router.get('/:id',
  show)

/**
 * @api {delete} /orders/:id Delete orders
 * @apiName DeleteOrders
 * @apiGroup Orders
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Orders not found.
 */
router.delete('/:id',
  destroy)

export default router
