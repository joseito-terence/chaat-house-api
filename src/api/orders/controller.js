import { success, notFound } from '../../services/response/'
import { Orders } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Orders.create(body)
    .then((orders) => orders.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Orders.count(query)
    .then(count => Orders.find(query, select, cursor)
      .then((orders) => ({
        count,
        rows: orders.map((orders) => orders.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Orders.findById(params.id)
    .then(notFound(res))
    .then((orders) => orders ? orders.view() : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Orders.findById(params.id)
    .then(notFound(res))
    .then((orders) => orders ? orders.remove() : null)
    .then(success(res, 204))
    .catch(next)
