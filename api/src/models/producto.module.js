'use strict';

const mongoose = require('mongoose');

var schema = new mongoose.Schema(
 {  
    // id: {
    //   type: Number, 
    //   index: true, 
    //   unique: true,
    //   auto: true
    // },    
    nombre: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, 'el nombre es necesario']
    },
    imagen_url: {
      type: String,
      lowercase: true,
      required: false
    },
    role:{
      type: String,
      default: 'USER_ROLE'
    },
    precio: {
      type: Number,
      default: 0,
      lowercase: true,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'metadata.createdAt',
      updatedAt: 'metadata.updatedAt'
    },
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);

// Duplicate the ID field. 93
// schema.virtual('id').get(function(){no
//   return this._id.toHexString();
// });

schema.options.toJSON.transform = function (doc, ret, options) {
//   // remove the _id of every document before returning the result
//   ret.id = ret._id;
//   delete ret._id;
  // delete ret.role;
  delete ret.__v;
}
module.exports = mongoose.model('Producto', schema);