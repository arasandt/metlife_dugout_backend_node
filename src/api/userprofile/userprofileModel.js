const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userprofileSchema = new mongoose.Schema(
  {

    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    id: {
      type: Number,
      required: true,
      unique: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    token: {
      type: String
    },

    coins: {
      type: Number,
      default: 0
    },

    rank: {
      type: Number,
      default: 0
    }
},
{ timestamps: true }
)

userprofileSchema.set('toJSON', {
    transform: function(doc, ret, opt) {
        delete ret['password']
        delete ret['_id']
        // delete ret['createdAt']
        // delete ret['updatedAt']
        // delete ret['__v']
        return ret
    }
})

userprofileSchema.pre('save', function(next) { //there is also post
  if (!this.isModified('password')) {
    return next()
  }

  bcrypt.hash(this.password, 8, (err, hash) => { //can even do hashsync. 8 is salt. you can generate salt even using bcrypt.genSaltSync
    if (err) {
      return next(err)
    }

    this.password = hash
    next()
  })
})
// userprofileSchema.statics. -> this will apply on model class while method apply on model instances.
userprofileSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => { //can even do comparesync
      if (err) {
        return reject(err)
      }
      resolve(same)
    })
  })
}
module.exports = UserProfile = mongoose.model('userprofile', userprofileSchema)
