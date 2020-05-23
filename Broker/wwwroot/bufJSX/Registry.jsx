class RegistryForm extends React.Component {
    render() {
        return (
            <form asp-anti-forgery="true" action="/Account/Register" method="post">
                <div>
                    <div>
                        <label for="Email">Введите Email</label><br />
                        <input type="text" data-val="true" data-val-required="&#x41D;&#x435; &#x443;&#x43A;&#x430;&#x437;&#x430;&#x43D; Email" id="Email" name="Email" value="" />
                        <span className="field-validation-valid" data-valmsg-for="Email" data-valmsg-replace="true" />
                    </div>
                    <div>
                        <label for="Password">Введите пароль</label><br />
                        <input type="password" data-val="true" data-val-required="&#x41D;&#x435; &#x443;&#x43A;&#x430;&#x437;&#x430;&#x43D; &#x43F;&#x430;&#x440;&#x43E;&#x43B;&#x44C;" id="Password" name="Password" />
                        <span className="field-validation-valid" data-valmsg-for="Password" data-valmsg-replace="true" />
                    </div>
                    <div>
                        <label for="ConfirmPassword">Повторите пароль</label><br />
                        <input type="password" data-val="true" data-val-equalto="&#x41F;&#x430;&#x440;&#x43E;&#x43B;&#x44C; &#x432;&#x432;&#x435;&#x434;&#x435;&#x43D; &#x43D;&#x435;&#x432;&#x435;&#x440;&#x43D;&#x43E;" data-val-equalto-other="*.Password" id="ConfirmPassword" name="ConfirmPassword" />
                        <span className="field-validation-valid" data-valmsg-for="ConfirmPassword" data-valmsg-replace="true" />
                    </div>
                    <div>
                        <label for="FirstName">Введите Имя</label><br />
                        <input type="text" data-val="true" data-val-required="&#x41D;&#x435; &#x443;&#x43A;&#x430;&#x437;&#x430;&#x43D;&#x43E; &#x418;&#x43C;&#x44F;" id="FirstName" name="FirstName" value="" />
                        <span className="field-validation-valid" data-valmsg-for="FirstName" data-valmsg-replace="true" />
                    </div>
                    <div>
                        <label for="SecondName">Введите Имя</label><br />
                        <input type="text" data-val="true" data-val-required="&#x41D;&#x435; &#x443;&#x43A;&#x430;&#x437;&#x430;&#x43D;&#x430; &#x424;&#x430;&#x43C;&#x438;&#x43B;&#x438;&#x44F;" id="SecondName" name="SecondName" value="" />
                        <span className="field-validation-valid" data-valmsg-for="SecondName" data-valmsg-replace="true" />
                    </div>
                    <div>
                        <input type="submit" value="Регистрация" />
                    </div>
                </div>
                <input name="__RequestVerificationToken" type="hidden" value="CfDJ8NSLP786ohpKgxiPhDaJNjJDJkDQgQ0Hm2HULLN6x_qCSzahe9-JlOIvA8wt9pvEJ-K5IjLr2D8skyjYKJmy6BboHIfYCGB_KXFCPjD_1N4r5E4jbQS_9cfpR9mpoBBDBdgTktd28b32NHusb7voq8o" />
            </form>
        );
    }
}