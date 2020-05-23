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
    onSubmit(e) {
        e.preventDefault();
        var email = this.state.Email.trim();
        var password = this.state.Password.trim();
        var confirmPassword = this.state.ConfirmPassword.trim();
        var firstName = this.state.FirstName;
        var secondName = this.state.SecondName;
        //console.log({ СompanyName: сompanyName, ImgSrc: imgSrc, CountryId: countryId, CurrentPrice: currentPrice });
        if (!email || !password || !confirmPassword || !firstName || !secondName) {
            return;
        }
        this.props.onRegistrySubmit({ Email: email, Password: password, ConfirmPassword: confirmPassword, FirstName: firstName, SecondName: secondName });
        this.setState({ Email: "", Password: "", ConfirmPassword: "", FirstName: "", SecondName: "" });
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
                <div>
                    <label for="ConfirmPassword">Повторите пароль</label><br />
                    <input type="password"
                        placeholder="ConfirmPassword"
                        value={this.state.ConfirmPassword}
                        onChange={this.onConfirmPasswordChange} />
                </div>
                <div>
                    <label for="FirstName">Введите Имя</label><br />
                    <input type="text"
                        placeholder="FirstName"
                        value={this.state.FirstName}
                        onChange={this.onFirstNameChange} />
                </div>
                <div>
                    <label for="SecondName">Введите Фамилию</label><br />
                    <input type="text"
                        placeholder="SecondName"
                        value={this.state.SecondName}
                        onChange={this.onSecondNameChange} />
                </div>

                <input type="submit" value="Сохранить" />
            </form>
        );
    }
}

class RegistryPage extends React.Component {
    constructor(props) {
        super(props);

        this.onRegistry = this.onRegistry.bind(this);
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
    render() {
        return (<div>
            <h1>Регистрация</h1>
            <RegistryForm onRegistrySubmit={this.onRegistry} />
        </div>);
    }
}