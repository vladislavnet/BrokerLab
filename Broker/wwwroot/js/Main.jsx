const URI = "https://localhost:44368/";
const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;
const Link = ReactRouterDOM.Link;
const Redirect = ReactRouterDOM.Redirect;








//Страница добавления акции
class ShareForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { СompanyName: "", ImgSrc: "", CountryId: 0, CurrentPrice: 0 };

        this.onSubmit = this.onSubmit.bind(this);
        this.onCompanyNameChange = this.onCompanyNameChange.bind(this);
        this.onImgSrcChange = this.onImgSrcChange.bind(this);
        this.onCountryIdChange = this.onCountryIdChange.bind(this);
        this.onCurrentPriceChange = this.onCurrentPriceChange.bind(this);
    }
    onCompanyNameChange(e) {
        this.setState({ CompanyName: e.target.value });
    }
    onImgSrcChange(e) {
        this.setState({ ImgSrc: e.target.value });
    }
    onCountryIdChange(e) {
        this.setState({ CountryId: e.target.value });
    }
    onCurrentPriceChange(e) {
        this.setState({ CurrentPrice: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        var сompanyName = this.state.CompanyName.trim();
        var imgSrc = this.state.ImgSrc.trim();
        var countryId = this.state.CountryId;
        var currentPrice = this.state.CurrentPrice;
        console.log(countryId);
        this.checkForm({ СompanyName: сompanyName, ImgSrc: imgSrc, CountryId: countryId, CurrentPrice: currentPrice })
        console.log({ СompanyName: сompanyName, ImgSrc: imgSrc, CountryId: countryId, CurrentPrice: currentPrice });
        if (!сompanyName || !imgSrc || +countryId <= 0 || +currentPrice <= 0) {
            console.log("Заполните все поля");
            return;
        }
        this.props.onShareSubmit({ СompanyName: сompanyName, ImgSrc: imgSrc, CountryId: countryId, CurrentPrice: currentPrice });
        this.setState({ СompanyName: "", ImgSrc: "", CountryId: 0, CurrentPrice: 0 });
    }
    checkForm(share) {
        let validAddShareCompanyName = document.getElementById("validAddShareCompanyName");
        let validAddShareImgSrc = document.getElementById("validAddShareImgSrc");
        let validAddShareCountryId = document.getElementById("validAddShareCountryId");
        let validAddSharePrice = document.getElementById("validAddSharePrice");
        validAddShareCompanyName.textContent = "";
        validAddShareImgSrc.textContent = "";
        validAddShareCountryId.textContent = "";
        validAddSharePrice.textContent = "";

        //if (!share.CompanyName) {
        //    validAddShareCompanyName.textContent = "Название не должно быть пустым";
        //}
        if (!share.ImgSrc) {
            validAddShareImgSrc.textContent = "URL не должен быть пустым";
        }
        if (share.CountryId <= 0) {
            validAddShareCountryId.textContent = "Выберите страну";
        }
        if (share.CurrentPrice <= 0) {
            validAddSharePrice.textContent = "Цена должна быть больше нуля";
        }
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <p>
                    <input type="text"
                        placeholder="Название компании"
                        value={this.state.CompanyName}
                        onChange={this.onCompanyNameChange} />
                    <br />
                    <label id="validAddShareCompanyName"></label>
                </p>
                <p>
                    <input type="text"
                        placeholder="URL логотипа"
                        value={this.state.ImgSrc}
                        onChange={this.onImgSrcChange} />
                    <br />
                    <label id="validAddShareImgSrc"></label>
                </p>
                <p>
                    <label>
                        Страна:
                        <select value={this.state.CountryId} onChange={this.onCountryIdChange}>
                            <option value="0"></option>
                            <option value="2">США</option>
                            <option value="3">Южная Корея</option>
                            <option value="4">Китай</option>
                            <option value="5">Япония</option>
                            <option value="1">Россия</option>
                        </select>
                    </label>
                    <br />
                    <label id="validAddShareCountryId"></label>
                </p>
                <p>
                    <input type="number"
                        placeholder="Стоимость акции"
                        value={this.state.CurrentPrice}
                        onChange={this.onCurrentPriceChange} />
                    <br />
                    <label id="validAddSharePrice"></label>
                </p>
                <input type="submit" value="Сохранить" />
            </form>
        );
    }
}

class AddSharePage extends React.Component {
    constructor(props) {
        super(props);
        var r = "";
        if (this.getCookie("role")) {
            r = this.getCookie("role");
        }
        this.state = {
            Role: r
        };

        this.onAddShare = this.onAddShare.bind(this);
    }

    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : 0;
    }

    onAddShare(share) {
        if (share) {

            const data = new FormData();
            data.append("CompanyName", share.СompanyName);
            data.append("ImgSrc", share.ImgSrc);
            data.append("CountryId", share.CountryId);
            data.append("CurrentPrice", share.CurrentPrice);
            var xhr = new XMLHttpRequest();
            console.log(share.СompanyName);


            xhr.open("post", URI + "api/share/AddShare" , true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log("Запрос отправлен успешно");
                    document.getElementById("checkAdd").textContent = "Акция добавлена успешно";
                } else {
                    console.log("Запрос отправлен не успешно");
                    document.getElementById("checkAdd").textContent = "Произошла ошибка";
                }
            }.bind(this);
            xhr.send(data);
        }     
    }
    render() {
        if (this.state.Role == "Admin") {
            return (<div>
                <h1>Добавление акции</h1>
                <ShareForm onShareSubmit={this.onAddShare} />
                <p id="checkAdd"></p>
            </div>);
        } else {
            return <Redirect to="/" />
        }
    }
}












//Страница регистрации
class RegistryForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { Email: "", Password: "", ConfirmPassword: "", FirstName: "", SecondName: "" };

        this.onSubmit = this.onSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onSecondNameChange = this.onSecondNameChange.bind(this);
    }
    onEmailChange(e) {
        this.setState({ Email: e.target.value });
    }
    onPasswordChange(e) {
        this.setState({ Password: e.target.value });
    }
    onConfirmPasswordChange(e) {
        this.setState({ ConfirmPassword: e.target.value });
    }
    onFirstNameChange(e) {
        this.setState({ FirstName: e.target.value });
    }
    onSecondNameChange(e) {
        this.setState({ SecondName: e.target.value });
    }
    onRegistry(registerModel) {
        if (registerModel) {

            const data = new FormData();
            data.append("Email", registerModel.Email);
            data.append("Password", registerModel.Password);
            data.append("ConfirmPassword", registerModel.ConfirmPassword);
            data.append("FirstName", registerModel.FirstName);
            data.append("SecondName", registerModel.SecondName);
            var xhr = new XMLHttpRequest();
            console.log(data);

            xhr.open("post", URI + "api/account/register", true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log("Запрос отправлен успешно");
                } else {
                    console.log("Запрос отправлен не успешно");
                }
            }.bind(this);
            xhr.send(data);
        }
    }
    
    onSubmit(e) {
        e.preventDefault();
        var email = this.state.Email.trim();
        var password = this.state.Password.trim();
        var confirmPassword = this.state.ConfirmPassword.trim();
        var firstName = this.state.FirstName.trim();
        var secondName = this.state.SecondName.trim();
        //console.log({ СompanyName: сompanyName, ImgSrc: imgSrc, CountryId: countryId, CurrentPrice: currentPrice });
        this.checkForm({ Email: email, Password: password, ConfirmPassword: confirmPassword, FirstName: firstName, SecondName: secondName });
        if (!email || !password || !confirmPassword || !firstName || !secondName) {
            return;
        }
        this.onRegistry({ Email: email, Password: password, ConfirmPassword: confirmPassword, FirstName: firstName, SecondName: secondName });
        this.setState({ Email: "", Password: "", ConfirmPassword: "", FirstName: "", SecondName: ""});
    }

    checkForm(register) {
        var validRegisterEmail = document.getElementById("validRegisterEmail");
        var validRegisterPassword = document.getElementById("validRegisterPassword");
        var validRegisterConfirmPassword = document.getElementById("validRegisterConfirmPassword");
        var validRegisterFirstName = document.getElementById("validRegisterFirstName");
        var validRegisterSecondName = document.getElementById("validRegisterSecondName");
        if (!register.Email) {
            validRegisterEmail.textContent = "Email не должен быть пустым";
        } else {
            validRegisterEmail.textContent = "";
        }
        if (!register.Password) {
            validRegisterPassword.textContent = "Пароль не должен быть пустым";
        } else {
            validRegisterPassword.textContent = "";
        }
        if (!register.ConfirmPassword) {
            validRegisterConfirmPassword.textContent = "Повторный пароль не дожен быть пустым";
        } else if (register.ConfirmPassword !== register.Password) {
            validRegisterConfirmPassword.textContent = "Повторный пароль и пароль должны быть одинаковыми";
        } else {
            validRegisterConfirmPassword.textContent = "";
        }
        if (!register.FirstName) {
            validRegisterFirstName.textContent = "Имя не должно быть пустым";
        } else {
            validRegisterFirstName.textContent = "";
        }
        if (!register.SecondName) {
            validRegisterSecondName.textContent = "Фамилия не должно быть пустой";
        } else {
            validRegisterSecondName.textContent = "";
        }
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <label for="Email">Введите Email</label><br />
                    <input type="text"
                        placeholder="Email"
                        value={this.state.Email}
                        onChange={this.onEmailChange} />
                    <br />
                    <label id="validRegisterEmail"></label>
                </div>
                <div>
                    <label for="Password">Введите пароль</label><br />
                    <input type="password"
                        placeholder="Password"
                        value={this.state.Password}
                        onChange={this.onPasswordChange} />
                    <br />
                    <label id="validRegisterPassword"></label>
                </div>
                <div>
                    <label for="ConfirmPassword">Повторите пароль</label><br />
                    <input type="password"
                        placeholder="ConfirmPassword"
                        value={this.state.ConfirmPassword}
                        onChange={this.onConfirmPasswordChange} />
                    <br />
                    <label id="validRegisterConfirmPassword"></label>
                </div>
                <div>
                    <label for="FirstName">Введите Имя</label><br />
                    <input type="text"
                        placeholder="FirstName"
                        value={this.state.FirstName}
                        onChange={this.onFirstNameChange} />
                    <br />
                    <label id="validRegisterFirstName"></label>
                </div>
                <div>
                    <label for="SecondName">Введите Фамилию</label><br />
                    <input type="text"
                        placeholder="SecondName"
                        value={this.state.SecondName}
                        onChange={this.onSecondNameChange} />
                    <br />
                    <label id="validRegisterSecondName"></label>
                </div>

                <input type="submit" value="Сохранить" />
            </form>
        );
    }
}

class RegistryPage extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (<div>
            <h1>Регистрация</h1>
            <RegistryForm />          
        </div>);
    }
}








//Страница Авторизации
class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { Email: "", Password: "" };

        this.onSubmit = this.onSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }
    onEmailChange(e) {
        this.setState({ Email: e.target.value });
    }
    onPasswordChange(e) {
        this.setState({ Password: e.target.value });
    }
    onLogin(loginModel) {
        if (loginModel) {

            const data = new FormData();
            data.append("Email", loginModel.Email);
            data.append("Password", loginModel.Password);
            var xhr = new XMLHttpRequest();
            console.log(data);

            xhr.open("post", URI + "api/account/login", true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log("Запрос отправлен успешно");
                    if (xhr.responseText) {
                        //document.cookie = "login=" + xhr.responseText;
                        console.log(document.cookie);
                    }
                    console.log(xhr.responseText);
                } else {
                    console.log("Запрос отправлен не успешно");
                    console.log(xhr.responseText);
                }
            }.bind(this);
            xhr.send(data);
        }
    }
    onSubmit(e) {
        e.preventDefault();
        var email = this.state.Email.trim();
        var password = this.state.Password.trim();
        //console.log({ СompanyName: сompanyName, ImgSrc: imgSrc, CountryId: countryId, CurrentPrice: currentPrice });
        if (!email || !password) {
            return;
        }
        this.onLogin({ Email: email, Password: password });
        this.setState({ Email: "", Password: "" });
    }
    setCookie(name, value, options = {}) {
        options = {
            path: '/',
        };
        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
        document.cookie = updatedCookie;
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <label for="Email">Введите Email</label><br />
                    <input type="text"
                        placeholder="Email"
                        value={this.state.Email}
                        onChange={this.onEmailChange} />
                </div>
                <div>
                    <label for="Password">Введите пароль</label><br />
                    <input type="password"
                        placeholder="Password"
                        value={this.state.Password}
                        onChange={this.onPasswordChange} />
                </div>

                <input type="submit" value="Войти" />
            </form>
        );
    }
}

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div>
            <h1>Авторизация</h1>
            <LoginForm />
            <Link to="/Registry">Регистрация</Link>
        </div>);
    }
}












//Страница профиля
class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        var idUser = 0;
        if (this.getCookie("idUser")) {
            idUser = this.getCookie("idUser")
        }
        this.state = {
            IdUser: idUser,
            Portfolio: []
        };
    }
    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : 0;
    }
    componentDidMount() {
        if (this.getCookie("idUser")) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", URI + `api/account/GetPortfolio?IdUser=${this.getCookie("idUser")}`, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log("Запрос отправлен успешно");
                    if (xhr.responseText) {
                        let json = JSON.parse(xhr.responseText);
                        this.setState({ Portfolio: json });

                        console.log(json);
                    }
                } else {
                    console.log("Запрос отправлен не успешно");
                    console.log(xhr.responseText);
                }
            }.bind(this);
            xhr.send();

        } else {

        }
    }

    onSaleClick = (e) => {
        const obj = JSON.parse(e.target.id);
        const data = new FormData();
        data.append("IdSharePortfolio", obj.id);
        var xhr = new XMLHttpRequest();
        console.log(data);

        xhr.open("post", URI + "api/account/SaleShare", true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("Запрос отправлен успешно");
                if (xhr.responseText) {
                    this.props.onSetBalance(JSON.parse(xhr.responseText));
                    if (this.state.Portfolio.length > 1) {
                        var index = this.state.Portfolio.findIndex(x => x.id == obj.id);
                        this.state.Portfolio.splice(index, 1);
                    } else {
                        this.state.Portfolio.splice(0, 1);
                    }
                }
            } else {
                console.log("Запрос отправлен не успешно");
                console.log(xhr.responseText);
            }
        }.bind(this);
        xhr.send(data);
    }

    render() {
        return <table>
            <tr><th>Логотип</th><th>Название компании</th><th>Прибыльность</th><th></th></tr>
            {
                this.state.Portfolio.map(x => <tr>
                    <td><img height="50" width="50" src={x.imgSrc} /></td>
                    <td><Link to={`/Shares/${x.shareId}`}>{x.companyName}</Link></td>
                    <td>{x.profitability}</td>
                    <td><button id={JSON.stringify(x)} onClick={this.onSaleClick} >Продать</button></td>
                </tr>)
            }
        </table>
    }
}

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        var log = false
        if (this.getCookie("idUser")) {
            log = true;
            console.log(this.getCookie("idUser"))
        }
        this.state = { logged: log };
    }
    componentDidMount() {
        if (this.state.logged) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", URI + `api/account/getuser?id=${this.getCookie("idUser")}`, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log("Запрос отправлен успешно");
                    if (xhr.responseText) {
                        //document.cookie = "login=" + xhr.responseText;
                        let json = JSON.parse(xhr.responseText);
                        this.setState(json);
                        console.log(json);
                    }
                } else {
                    console.log("Запрос отправлен не успешно");
                    console.log(xhr.responseText);
                }
            }.bind(this);
            xhr.send();

        } else {

        }
    }

    onSetBalance = (balance) => {
        this.setState({ Balance: balance })
        console.log(balance);
    }

    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : 0;
    }
    render() {
        if (this.state.logged) {
            return (<div>
                <h1>Профиль</h1>
                <p> Имя: {this.state.FirstName}</p>
                <p> Фамилия: {this.state.SecondName}</p>
                <p> Email: {this.state.Email}</p>
                <p> Баланс: {this.state.Balance}</p>
                <Link to="/Balance">Пополнить баланс</Link>
                <Portfolio onSetBalance={this.onSetBalance} />
            </div>);
        } else {
            return <Redirect to="/Login" />
        }
    }
}








//Пополнить баланс
class BalanceForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { IdUser: 0, Balance: 0 };

        this.onSubmit = this.onSubmit.bind(this);
        this.onBalanceChange = this.onBalanceChange.bind(this);
    }
    onBalanceChange(e) {
        this.setState({ Balance: e.target.value });
    }
    
    onSetBalance(balanceModel) {
        if (balanceModel) {

            const data = new FormData();
            data.append("IdUser", this.getCookie("idUser"));
            data.append("Balance", balanceModel.Balance);
            var xhr = new XMLHttpRequest();

            console.log(this.getCookie("idUser"));
            console.log(balanceModel.Balance);

            xhr.open("post", URI + "api/account/setbalance", true);
            xhr.onload = function () {
                var validBalance = document.getElementById("validBalance");
                if (xhr.status === 200 && xhr.responseText == "true") {
                    validBalance.textContent = "Баланс успешно пополнен"
                } else {
                    validBalance.textContent = "Произошла ошибка, возможно пользователь не зарегистрирован"
                }
            }.bind(this);
            xhr.send(data);
        }
    }
    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : 0;
    }
    checkForm(balnce) {
        if (balnce <= 0) {
            var validBalance = document.getElementById("validBalance");
            validBalance.textContent = "Баланс заполнен неверно"
        }
    }
    onSubmit(e) {
        e.preventDefault();
        var balance = this.state.Balance;
        var idUser = this.getCookie("idUser");
        //console.log({ СompanyName: сompanyName, ImgSrc: imgSrc, CountryId: countryId, CurrentPrice: currentPrice });
        this.checkForm(balance)
        if (idUser == 0 || +balance <= 0) {
            return;
        }
        this.onSetBalance({ IdUser: idUser, Balance: balance });
        this.setState({ IdUser: 0, Balance: 0 });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <label>Введмте сумму</label>
                    <input type="number"
                        placeholder="Введите сумму"
                        value={this.state.Balance}
                        onChange={this.onBalanceChange} />
                    <br />
                    <label id="validBalance"></label>
                </div>

                <input type="submit" value="Пополнить" />
            </form>
        );
    }
}

class BalancePage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div>
            <h1>Пополнить баланс</h1>
            <BalanceForm />
            <Link to="/Profile">Профиль </Link>
        </div>);
    }
}








//Страница акции
class SharePage extends React.Component {
    constructor(props) {
        super(props);
        var r = "";
        if (this.getCookie("role")) {
            r = this.getCookie("role");
        }
        this.state = {
            CheckShare: 1,
            Role: { role: r, },
            Share: {},
            Country: {},
            HistoryPrice:[]
        };

        this.onSubmitPay = this.onSubmitPay.bind(this);
        this.onSubmitDelete = this.onSubmitDelete.bind(this);
        this.getCookie = this.getCookie.bind(this);
    }
    componentDidMount() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", URI + `api/share/GetShare?id=${this.props.match.params.id}`, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("Запрос отправлен успешно");
                if (xhr.responseText) {
                    //document.cookie = "login=" + xhr.responseText;
                    let json = JSON.parse(xhr.responseText);
                    this.setState({ Share: json });
                    this.setState({ Country: json.Country });
                    console.log(this.state);
                }
            } else {
                console.log("Запрос отправлен не успешно");
                console.log(xhr.responseText);
            }
        }.bind(this);
        xhr.send();

        var xhrHistory = new XMLHttpRequest();
        xhrHistory.open("GET", URI + `api/share/GetHistoryPeiceShare?id=${this.props.match.params.id}`, true);
        xhrHistory.onload = function () {
            if (xhrHistory.status === 200) {
                console.log("Запрос отправлен успешно");
                if (xhrHistory.responseText) {
                    //document.cookie = "login=" + xhr.responseText;
                    let json = JSON.parse(xhrHistory.responseText);
                    this.setState({ HistoryPrice: json });
                    console.log(this.state);
                }
            } else {
                console.log("Запрос отправлен не успешно");
                console.log(xhrHistory.responseText);
                this.setState({ CheckShare: 0 });
            }
        }.bind(this);
        xhrHistory.send();
    }
    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : 0;
    }

    onSubmitPay(e) {
        e.preventDefault();
        const data = new FormData();
        data.append("UserId", this.getCookie("idUser"));
        data.append("ShareId", this.props.match.params.id);
        var xhr = new XMLHttpRequest();


        xhr.open("post", URI + "api/share/PayShare", true);
        xhr.onload = function () {
            var validPayShare = document.getElementById("validPayShare");
            if (xhr.status === 200) {
                validPayShare.textContent = xhr.responseText;
            } else {
                validPayShare.textContent = "Произошла ошибка, возможно пользователь не зарегистрирован"
            }
        }.bind(this);
        xhr.send(data);
    }

    onSubmitDelete(e) {
        e.preventDefault();
        const data = new FormData();
        data.append("Id", this.props.match.params.id);
        var xhr = new XMLHttpRequest();


        xhr.open("DELETE", URI + "api/share/DeleteShare", true);
        xhr.onload = function () {
            var validDeleteShare = document.getElementById("validDeleteShare");
            if (xhr.status === 200) {
                validDeleteShare.textContent = xhr.responseText;
            } else {
                validDeleteShare.textContent = "Произошла ошибка, возможно пользователь не зарегистрирован"
            }
        }.bind(this);
        xhr.send(data);
    }

   
    render() {
        const listPrice = this.state.HistoryPrice.map(x => <div>
            <span>Цена: {x.price} руб. </span>
            <span> Дата изменения: {x.dateHistory}</span>
        </div>);


        if (this.state.Role.role == "Admin") {
            return <div>
                <h1>{this.state.Share.CompanyName}</h1>
                <img src={this.state.Share.ImgSrc} />
                <p>Страна: {this.state.Country.Name}</p>
                <p>Текущая цена: {this.state.Share.CurrentPrice}</p>
                <form onSubmit={this.onSubmitPay}>
                    <input type="submit" value="Купить" />
                    <br />
                    <label id="validPayShare"></label>
                </form>
                <form onSubmit={this.onSubmitDelete}>
                    <input type="submit" value="Удалить" />
                    <br />
                    <label id="validDeleteShare"></label>
                </form>
                <Link to={`/EditShare/${this.props.match.params.id}`}>Изменить</Link>
                <h2>История цен</h2>
                <div>{listPrice}</div>
            </div>
        } else if (this.state.Role.role == "User") {
            return <div>
                <h1>{this.state.Share.CompanyName}</h1>
                <img src={this.state.Share.ImgSrc} />
                <p>Страна: {this.state.Country.Name}</p>
                <p>Текущая цена: {this.state.Share.CurrentPrice}</p>
                <form onSubmit={this.onSubmitPay}>
                    <input type="submit" value="Купить" />
                    <br />
                    <label id="validPayShare"></label>
                </form>
                <h2>История цен</h2>
                <div>{listPrice}</div>
            </div>
        } else {
            return <div>
                <h1>{this.state.Share.CompanyName}</h1>
                <img src={this.state.Share.ImgSrc} />
                <p>Страна: {this.state.Country.Name}</p>
                <p>Текущая цена: {this.state.Share.CurrentPrice}</p>
                <h2>История цен</h2>
                <div>{listPrice}</div>
            </div>
        }
    }
}



//Страница редактирования акции

class EditSharePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { СompanyName: "", ImgSrc: "", CountryId: 0, CurrentPrice: 0 };

        this.onSubmit = this.onSubmit.bind(this);
        this.onСompanyNameChange = this.onСompanyNameChange.bind(this);
        this.onImgSrcChange = this.onImgSrcChange.bind(this);
        this.onCountryIdChange = this.onCountryIdChange.bind(this);
        this.onCurrentPriceChange = this.onCurrentPriceChange.bind(this);
        this.onEditShare = this.onEditShare.bind(this);
    }
    onСompanyNameChange(e) {
        this.setState({ СompanyName: e.target.value });
    }
    onImgSrcChange(e) {
        this.setState({ ImgSrc: e.target.value });
    }
    onCountryIdChange(e) {
        this.setState({ CountryId: e.target.value });
    }
    onCurrentPriceChange(e) {
        this.setState({ CurrentPrice: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        var сompanyName = this.state.СompanyName.trim();
        var imgSrc = this.state.ImgSrc.trim();
        var countryId = this.state.CountryId;
        var currentPrice = this.state.CurrentPrice;
        console.log(countryId);
        this.checkForm({ СompanyName: сompanyName, ImgSrc: imgSrc, CountryId: countryId, CurrentPrice: currentPrice })
        if (!сompanyName || !imgSrc || +countryId <= 0 || +currentPrice <= 0) {
            console.log("Заполните все поля");
            return;
        }
        this.onEditShare({ СompanyName: сompanyName, ImgSrc: imgSrc, CountryId: countryId, CurrentPrice: currentPrice });
        this.setState({ СompanyName: "", ImgSrc: "", CountryId: 0, CurrentPrice: 0 });
    }
    checkForm(share) {
        let validAddShareCompanyName = document.getElementById("validAddShareCompanyName");
        let validAddShareImgSrc = document.getElementById("validAddShareImgSrc");
        let validAddShareCountryId = document.getElementById("validAddShareCountryId");
        let validAddSharePrice = document.getElementById("validAddSharePrice");

        if (!share.ImgSrc) {
            validAddShareImgSrc.textContent = "URL не должен быть пустым";
        }
        if (share.CountryId <= 0) {
            validAddShareCountryId.textContent = "Выберите страну";
        }
        if (share.CurrentPrice <= 0) {
            validAddSharePrice.textContent = "Цена должна быть больше нуля";
        }
    }

    onEditShare(share) {
        if (share) {

            const data = new FormData();
            data.append("Id", this.props.match.params.id);
            data.append("CompanyName", share.СompanyName);
            data.append("ImgSrc", share.ImgSrc);
            data.append("CountryId", share.CountryId);
            data.append("CurrentPrice", share.CurrentPrice);
            var xhr = new XMLHttpRequest();
            console.log(share.СompanyName);


            xhr.open("post", URI + "api/share/EditShare", true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log("Запрос отправлен успешно");
                    var reqEditShare = document.getElementById("reqEditShare");
                    reqEditShare.textContent = xhr.responseText;
                } else {
                    console.log("Запрос отправлен не успешно");
                }
            }.bind(this);
            xhr.send(data);
        }
    }

    componentDidMount() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", URI + `api/share/GetShare?id=${this.props.match.params.id}`, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("Запрос отправлен успешно");
                if (xhr.responseText) {
                    let json = JSON.parse(xhr.responseText);
                    console.log(json);
                    this.setState({ СompanyName: json.CompanyName });
                    this.setState({ ImgSrc: json.ImgSrc });
                    this.setState({ CountryId: json.Country.Id });
                    this.setState({ CurrentPrice: json.CurrentPrice });
                    console.log(this.state);
                }
            } else {
                console.log("Запрос отправлен не успешно");
                console.log(xhr.responseText);
            }
        }.bind(this);
        xhr.send();
    }

    render() {
        return (<div>
            <h1>Редактирование акции</h1>
            <form onSubmit={this.onSubmit}>
                <p>
                    <input type="text"
                        placeholder="Название компании"
                        value={this.state.СompanyName}
                        onChange={this.onСompanyNameChange} />
                    <br />
                    <label id="validAddShareCompanyName"></label>
                </p>
                <p>
                    <input type="text"
                        placeholder="URL логотипа"
                        value={this.state.ImgSrc}
                        onChange={this.onImgSrcChange} />
                    <br />
                    <label id="validAddShareImgSrc"></label>
                </p>
                <p>
                    <label>
                        Страна:
                        <select value={this.state.CountryId} onChange={this.onCountryIdChange}>
                            <option value="0"></option>
                            <option value="2">США</option>
                            <option value="3">Южная Корея</option>
                            <option value="4">Китай</option>
                            <option value="5">Япония</option>
                            <option value="1">Россия</option>
                        </select>
                    </label>
                    <br />
                    <label id="validAddShareCountryId"></label>
                </p>
                <p>
                    <input type="number"
                        placeholder="Стоимость акции"
                        value={this.state.CurrentPrice}
                        onChange={this.onCurrentPriceChange} />
                    <br />
                    <label id="validAddSharePrice"></label>
                </p>
                <input type="submit" value="Изменить" />
                <br />
                <label id="reqEditShare"></label>
            </form>
        </div>);
    }
}









//Главная страница
class CardShare extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return 
        <div class="product-item">
            <img src={this.props.ImgSrc}></img>
                <div className="product-list">
                    <h3>{this.props.Name}</h3>
                <span class="price">Цена: {this.props.Price}</span>
                <Link to={`/Shares/${this.props.Id}`} className="button">Открыть</Link>
            </div>
        </div>      
    }
}

class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {Shares:[]};
    }
    componentDidMount() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", URI + `api/share/getshares`, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("Запрос отправлен успешно");
                let json = JSON.parse(xhr.responseText);
                //this.setState(json);
                //json.map(x => this.state.push(x));
                this.setState({ Shares: json })
                //this.setState(json);
                console.log(this.state.Shares);
            } else {
                console.log("Запрос отправлен не успешно");
                console.log(xhr.responseText);
            }
        }.bind(this);
        xhr.send();
    }
    render() {
        const listCard = this.state.Shares.map(x => <div class="product-item">
            <img src={x.imgSrc}></img>
            <div className="product-list">
                <h3>{x.name}</h3>
                <span class="price">{x.price}</span>
                <Link to={`/Shares/${x.id}`} className="button">Открыть</Link>
            </div>
        </div>);

        return <div>
            <h1>Главная страница</h1>
            <div>{listCard}</div>
        </div>
    }
}











 //Навигация по сайту
class Menu extends React.Component {
    render() {
        return <nav>
            <ul class="menu">
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/AddShare">Добавить акцию</Link></li>
                <li><Link to="/Profile">Профиль</Link></li>
            </ul>
        </nav>
    }
}

class Navigation extends React.Component {
    render() {
        return <Router>
            <div>
                <Menu />
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route path="/AddShare" component={AddSharePage} />
                    <Route path="/Registry" component={RegistryPage} />
                    <Route path="/Login" component={LoginPage} />
                    <Route path="/Profile" component={ProfilePage} />
                    <Route path="/Balance" component={BalancePage} />
                    <Route path="/Shares/:id" component={SharePage} />
                    <Route path="/EditShare/:id" component={EditSharePage}/>
                </Switch>
            </div>
        </Router>
    }
}



ReactDOM.render(
    <Navigation />,
    document.getElementById("app")
);

