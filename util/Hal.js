const url = require('url');

function addSelf(object, req, path) {
    let href = url.format({
        protocol: req.protocol,
        host: req.get("host"),
        pathname: "api/" + path + "/" + object.id
    });
    return {"self": {"href": href}}
}
module.exports = addSelf;