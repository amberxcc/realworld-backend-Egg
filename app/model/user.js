const { myHash } = require('../extend/helper')

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            set: str => myHash(str),
        },
        bio: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: ''
        },
        followers: {
            type: [String]
        },
    }, { versionKey: false, timestamps: true })


    UserSchema.methods.assertFollower = function (userId) {
        return this.followers.includes(userId)
    }


    UserSchema.methods.addFollower = async function (followerId) {
        if (!this.followers.includes(followerId)) {
            this.followers.push(followerId)
            await this.save()
        }

    }


    UserSchema.methods.removeFollower = async function (followerId) {
        for (let i = 0; i < this.followers.length; i++) {
            if (this.followers[i] === followerId) {
                this.followers.splice(followerId, 1)
                await this.save()
            }
        }
    }

    return mongoose.model('User', UserSchema);
}