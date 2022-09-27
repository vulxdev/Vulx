let scripts = [
    '/js/vulx.load.js',
    '/js/slip.js', 
    '/js/vulx.welcome.js',
    '/js/vulx.profile.js',
    '/js/vulx.request.friends.js',
    '/js/vulx.request.reset.js',
    '/js/vulx.request.settings.js',
    '/js/vulx.request.session.js',
    '/js/vulx.search.js',
];

let create = (info) => {
    return new Promise(function(resolve, reject) {
        let data = document.createElement('script');
        data.type = "module";
        data.src = info;
        data.async = false;
        data.onload = () => {
            resolve(info);
        };
        data.onerror = () => {
            reject(info);
        };
        document.body.appendChild(data);
    });
};
let promiseData = [];

scripts.forEach(function(info) {
    promiseData.push(create(info));
    console.log("[Vulx] Loading script: " + info)
});
Promise.all(promiseData).then(function() {
    console.log('The required scripts are loaded successfully!');
}).catch(function(data) {
    console.log(data + ' failed to load!');
});