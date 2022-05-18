module.exports.queryString = (obj) => {
    let query = "?";

    Object.keys(obj).forEach(key => { 
        if(typeof obj[key] === "object" && !Array.isArray(obj[key])) {
            throw new Error("Objects are not allowed in the query string");
        }
    });

    Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key])) {
            let values = [];
            obj[key].forEach(value => {
                values.push(value === undefined || "" || value.length === 0 ? "" : encodeURIComponent(value));
                values.join(",");
            });
            query += `${key}=${values}&`;
        } else {
            query += `${key}=${obj[key] === undefined || "" || obj[key].length === 0 ? "" : encodeURIComponent(obj[key])}&`;
        }
    })
    return query.slice(0, -1);
}

module.exports.queryStringToObject = (query) => {
    let obj = {};
    query.slice(1).split("&").forEach(item => { 
        let [key, value] = item.split("=");
        if(value.includes(",")) {
            value = value.split(",");
        }
        obj[key] = value;
    })
    return obj;
}
