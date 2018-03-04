let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
  }

const blogs= [
    {
        id: "5a9a93b0f4133a4428cea600",
        title: "Uusi blogi",
        author: "Minä itse",
        url: "www.itse.fi",
        likes: 13,
        user: {
            _id: "5a9a74a5057f843d40cf4d85",
            username: "otto",
            name: "Otto Hyytiälä"
        }
    },
    {
        id: "5a9a94bcf4133a4428cea601",
        title: "testtiuusi",
        author: "uusi tester",
        url: "www.testset.fi",
        likes: 14,
        user: {
            _id: "5a9a74a5057f843d40cf4d85",
            username: "otto",
            name: "Otto Hyytiälä"
        }
    },
    {
        id: "5a9abcc5d327754994aba871",
        title: "Kiinnostava blogi",
        author: "kiinnostava kirjailija",
        url: "www.blogit.fi",
        likes: 4,
        user: {
            _id: "5a9a74a5057f843d40cf4d85",
            username: "otto",
            name: "Otto Hyytiälä"
        }
    },
    {
        id: "5a9ae1fc8bbd4e8fdc355805",
        title: "testing",
        author: "tersree",
        url: "fgsdfg.com",
        likes: 0,
        user: {
            _id: "5a9a74a5057f843d40cf4d85",
            username: "otto",
            name: "Otto Hyytiälä"
        }
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
  }
  
  export default { getAll, blogs, setToken }