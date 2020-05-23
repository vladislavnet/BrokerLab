
class LoginForm extends React.Component {
    render() {
        return (
            <form asp-anti-forgery="true" action="/Account/Login" method="post">

                <div>
                    <div className="form-group">
                        <label for="Email">Введите Email</label>
                        <input type="text" data-val="true" data-val-required="&#x41D;&#x435; &#x443;&#x43A;&#x430;&#x437;&#x430;&#x43D; Email" id="Email" name="Email" value="" />
                        <span className="field-validation-valid" data-valmsg-for="Email" data-valmsg-replace="true" />
                    </div>
                    <div className="form-group">
                        <label for="Password">Введите пароль</label>
                        <input type="password" data-val="true" data-val-required="&#x41D;&#x435; &#x443;&#x43A;&#x430;&#x437;&#x430;&#x43D; &#x43F;&#x430;&#x440;&#x43E;&#x43B;&#x44C;" id="Password" name="Password" />
                        <span className="field-validation-valid" data-valmsg-for="Password" data-valmsg-replace="true" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Войти" class="btn" />
                    </div>
                </div>
                <input name="__RequestVerificationToken" type="hidden" value="CfDJ8NSLP786ohpKgxiPhDaJNjKjUuBOjRBAbbxAu3ZQhijFlKhVG4SboL_Dlg9ajFsFL2-wnlmmWfyRv6TiWPNEfnnRryc-91u261SAny68uAee6L-GpTJX7fXLFcIhVpVdwrbihSkuzpbbJ8YbG6NYhlw" />
            </form>
        );
    }
}