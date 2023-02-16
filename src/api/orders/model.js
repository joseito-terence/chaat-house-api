import mongoose, { Schema } from 'mongoose'

const ordersSchema = new Schema({
  ordered_by: {
    type: String
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Done']
  },
  items: [{
    item: String,
    qty: { type: Number }
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

ordersSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      ordered_by: this.ordered_by,
      status: this.status,
      items: this.items,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Orders', ordersSchema)

export const schema = model.schema
export default model
