export default  {
    name: {
        lp: "site_blogs",
        ls: "site_blog",
        up: "SiteBlogs",
        us: "SiteBlog",
        urlPath: "/posts",
        folderPath: "/content",
        index_title: "Post List"
    },
    permissions: {
        index: "all",
        view: "all",
        create: "mod",
        edit: "mod"
    },
    features: {
            filter: {
                options: ['draft', 'public', 'private'],
                protection: "admin",
            },
            sort: {
                options: [['created_at', 'Post Date'], ['blog_title', 'Alphabetical']],
            },
            search: {},
            paginate: {},
            tags: {},
            newLink: {
                protection: "admin",
                options: "Add New +",
            },
            thumbnail: {},
        },
    loader: { filter: 'public' },
    idField: 'site_blog_id',
    fields: {
    }
}