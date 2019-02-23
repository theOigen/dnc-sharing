let config = {
    port : process.env["PORT"] || 3015,
    mongo_url: process.env["MONGODB_URI"] || "mongodb://donothingclub:porter2556@ds021356.mlab.com:21356/dnc_hackathon",
    cloudinary: {
        cloud_name: "doulmg780",
        api_key: "698981441516159",
        api_secret: "C5Ls75nQCs14NQNdQ8ycqQmcpQY"
    },
    salt : "mYzAg@@@S@/\T=)",
    secret : "=)))",
    jwt_secret: "mYzAg@@@jiiiiweeeteee@@##33()"
}

module.exports = config;