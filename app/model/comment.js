module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const CommentSchema = new Schema({
        body: {
            type: String,
            required: true, 
        },
        article: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
    }, {versionKey: false, timestamps: true})

    return mongoose.model('Comment', CommentSchema);
}