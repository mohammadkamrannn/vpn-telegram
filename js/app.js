var baseUrl = 'https://mtpro.xyz/api/?type=mtproto';
var vpn = '';
function loadJSON(method, url, callback) {
    var xhr = new XMLHttpRequest;
    xhr.open(method, url);
    xhr.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            callback(JSON.parse(this.response));
        };
    };
    xhr.send();
};

window.onload = function() {
    getVpn();
}
function getVpn() {
    loadJSON('GET', `${baseUrl}`, function(req) {
        var $vpn = document.getElementById('vpn');
        for ( var i = 0; i < req.length; i++ ) {
            vpn += 
                `<tbody>
                    <tr>
                        <td class="text-center">${i+1}</td>
                        <td class="text-center ltr"><a class="text-dark" href="tg://proxy?server=${req[i].host}&port=${req[i].port}&secret=${req[i].secret}&bot=@mtpro_xyz_bot"> ${req[i].host}<a></td>
                        <td class="text-center">${req[i].port}</td>
                        <td class="text-center fa-dir">${req[i].country}</td>
                        <td class="text-center">${req[i].ping}</td>
                    </tr>
                </tbody>`;
            };
            $vpn.innerHTML = vpn;
        });
};
