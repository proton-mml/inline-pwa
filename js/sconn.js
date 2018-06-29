sconn = {};

sconn.token = "";
sconn.baseURL = "http://35.231.149.80:3300";
sconn.baseURL = "http://192.168.0.109:3300"

sconn.get = function (route, succ_callback) {
    let body = {token: sconn.token};
    $.get({
        url: sconn.baseURL + route,
        dataType: "text",
        data: body,
        success: (data) => {
            resp = JSON.parse(data);
            if (resp.success) succ_callback(resp);
            else {
                if (resp.error == "token invalido") sconn.logout(false);
                else succ_callback(resp);
            }
        },
        error: (_, errstr, __) => {
            console.log ("Error in sconn, for route: " + route + " #Err: " + errstr);
            page.showToast("Falha na comunicação com servidor: " + errstr);
        }
    });
};

sconn.post = function (route, body, succ_callback) {
    body.token = sconn.token;
    $.post({
        url: sconn.baseURL + route,
        data: body,
        dataType: "text",
        success: (data) => {
            resp = JSON.parse(data);
            if (resp.success) succ_callback(resp);
            else {
                if (resp.error == "token invalido") sconn.logout(false);
                else succ_callback(resp);
            }
        },
        error: (_, errstr, __) => {
            console.log ("Error in sconn, for route: " + route + " #Err: " + errstr);
            page.showToast("Falha na comunicação com servidor: " + errstr);
        }
    });
};

sconn.login = function (email, senha) {
    sconn.post("/autorizar", {email: email, senha: senha}, (answer) => {
        if (answer.success) {
            sconn.token = answer.token;
            localStorage.setItem("token", sconn.token);
            pageStack.clean();
            page.load('empresas_disponiveis');
        }
        else {
            page.showToast("Erro: " + answer.error);
        }
    });
}

sconn.logout = function (closeDrawer) {
    sconn.token = "";
    localStorage.removeItem ("token");
    pageStack.clean();
    page.load("login", {}, closeDrawer);
    page.showToast("Você está deslogado");
}

sconn.token = localStorage.getItem("token");
if (sconn.token) {
    pageStack.clean();
    page.load('empresas_disponiveis');
} else {
    page.load("login");
}
