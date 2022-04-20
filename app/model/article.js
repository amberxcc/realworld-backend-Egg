module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ArticleSchema = new Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        tagList: {
            type: [String],
            ref: 'Tag',
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        slug: {
            type: String,
        },
        favoritedList: {
            type: [String]
        },
    }, { versionKey: false, timestamps: true, })
    
    
    ArticleSchema.methods.getFavoriteCount = function () {
        return this.favoritedList.length
    }
    
    
    ArticleSchema.methods.assertFavorite = function (userId) {
        return this.favoritedList.includes(userId)
    }
    
    
    ArticleSchema.methods.addFavorite = async function (userId) {
        if (!this.favoritedList.includes(userId)) {
            this.favoritedList.push(userId)
            await this.save()
        }
    
    }
    
    
    ArticleSchema.methods.removeFavorite = async function (userId) {
        for (let i = 0; i < this.favoritedList.length; i++) {
            if (this.favoritedList[i] === userId) {
                this.favoritedList.splice(userId, 1)
                await this.save()
            }
        }
    }

    return mongoose.model('Article', ArticleSchema);
}