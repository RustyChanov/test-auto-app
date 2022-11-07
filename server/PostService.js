import Post from "../interface/post.js";
import fileService from "./fileService.js";

class PostService {
    async createPost(post, picture) {
        // const fileName = fileService.saveFile(picture);
        const createdPost = await Post.create({...post});
        return createdPost;
    }

    async getAll() {
        const posts = await Post.find();
        return posts;
    }

    async getOne(request, response) {
        try {
            const post = await PostService.getOne(request.params.id);
            return response.json(post);
        } catch (e) {
            response.status(500).json(e);
        }
    }

    async update(post) {
        if (!post._id) {
            throw new Error('ID is not specified');
        }
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true})
        //To get updates when data was updated. Source: https://mongoosejs.com/docs/api/model.html#model_Model-watch
        // Post.watch().on('change', data => console.log(data));
        // watch<Post, ChangeStreamDocument<Post>>()
        return updatedPost;
    }

    async delete(id) {
        if (!id) {
            throw new Error('ID is not specified');
        }
        const post = await Post.findByIdAndDelete(id);
        return post;
    }
}

export default new PostService();