import mongoose, { Schema } from 'mongoose'

const itemSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: String
  },
  image: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

itemSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      image: this.image,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Item', itemSchema)

export const schema = model.schema
export default model
