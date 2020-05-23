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
                        data-val="true"
                        id="Email"
                        name="Email"
                        data-val-required="Не указан Email"
                        onChange={this.onEmailChange} />
                    <span className="field-validation-valid" data-valmsg-for="Email" data-valmsg-replace="true" />
                </div>
                <div>
                    <label for="Password">Введите пароль</label><br />
                    <input type="password"
                        placeholder="Password"
                        value={this.state.Password}
                        data-val="true"
                        id="Password"
                        name="Password"
                        data-val-required="Не указан пароль"
                        onChange={this.onPasswordChange} />
                    <span className="field-validation-valid" data-valmsg-for="Email" data-valmsg-replace="true" />
                </div>
                <div>
                    <label for="ConfirmPassword">Повторите пароль</label><br />
                    <input type="password"
                        placeholder="ConfirmPassword"
                        value={this.state.ConfirmPassword}
                        data-val="true"
                        data-val-equalto-other="*.Password"
                        id="ConfirmPassword"
                        name="ConfirmPassword"
                        data-val-equalto="Пароль введен неверно"
                        onChange={this.onConfirmPasswordChange} />
                    <span className="field-validation-valid" data-valmsg-for="ConfirmPassword" data-valmsg-replace="true" />
                </div>
                <div>
                    <label for="FirstName">Введите Имя</label><br />
                    <input type="text"
                        placeholder="FirstName"
                        value={this.state.FirstName}
                        data-val="true"
                        id="FirstName"
                        name="FirstName"
                        data-val-required="Не указано Имя"
                        onChange={this.onFirstNameChange} />
                    <span className="field-validation-valid" data-valmsg-for="FirstName" data-valmsg-replace="true" />
                </div>
                <div>
                    <label for="SecondName">Введите Фамилию</label><br />
                    <input type="text"
                        placeholder="SecondName"
                        value={this.state.SecondName}
                        data-val="true"
                        id="SecondName"
                        name="SecondName"
                        data-val-required="Не указана Фамилия"
                        onChange={this.onSecondNameChange} />
                    <span className="field-validation-valid" data-valmsg-for="SecondName" data-valmsg-replace="true" />
                </div>

                <input type="submit" value="Сохранить" />
            </form>
        );
    }
}