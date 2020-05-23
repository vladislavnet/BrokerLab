//const Router = ReactRouterDOM.BrowserRouter;
//const Route = ReactRouterDOM.Route;
//const Switch = ReactRouterDOM.Switch;
//const Link = ReactRouterDOM.Link;

//class LoginForm extends React.Component {
//    render() {
//        return (
//            <form asp-anti-forgery="true" action="/Account/Login" method="post">

//                <div>
//                    <div className="form-group">
//                        <label for="Email">Введите Email</label>
//                        <input type="text" data-val="true" data-val-required="&#x41D;&#x435; &#x443;&#x43A;&#x430;&#x437;&#x430;&#x43D; Email" id="Email" name="Email" value="" />
//                        <span className="field-validation-valid" data-valmsg-for="Email" data-valmsg-replace="true" />
//                    </div>
//                    <div className="form-group">
//                        <label for="Password">Введите пароль</label>
//                        <input type="password" data-val="true" data-val-required="&#x41D;&#x435; &#x443;&#x43A;&#x430;&#x437;&#x430;&#x43D; &#x43F;&#x430;&#x440;&#x43E;&#x43B;&#x44C;" id="Password" name="Password" />
//                        <span className="field-validation-valid" data-valmsg-for="Password" data-valmsg-replace="true" />
//                    </div>
//                    <div className="form-group">
//                        <input type="submit" value="Войти" class="btn" />
//                    </div>
//                </div>
//                <input name="__RequestVerificationToken" type="hidden" value="CfDJ8NSLP786ohpKgxiPhDaJNjKjUuBOjRBAbbxAu3ZQhijFlKhVG4SboL_Dlg9ajFsFL2-wnlmmWfyRv6TiWPNEfnnRryc-91u261SAny68uAee6L-GpTJX7fXLFcIhVpVdwrbihSkuzpbbJ8YbG6NYhlw" />
//            </form>
//        );
//    }
//}


//class RegistryForm extends React.Component {
//    render() {
//        return (
//            <form asp-anti-forgery="true" action="/Account/Register" method="post">
//                <div>
//                    <div>
//                        <label for="Email">Введите Email</label><br />
//                        <input type="text" data-val="true" data-val-required="&#x41D;&#x435; &#x443;&#x43A;&#x430;&#x437;&#x430;&#x43D; Email" id="Email" name="Email" value="" />
//                        <span className="field-validation-valid" data-valmsg-for="Email" data-valmsg-replace="true" />
//                    </div>
//                    <div>
//                        <label for="Password">Введите пароль</label><br />
//                        <input type="password" data-val="true" data-val-required="&#x41D;&#x435; &#x443;&#x43A;&#x430;&#x437;&#x430;&#x43D; &#x43F;&#x430;&#x440;&#x43E;&#x43B;&#x44C;" id="Password" name="Password" />
//                        <span className="field-validation-valid" data-valmsg-for="Password" data-valmsg-replace="true" />
//                    </div>
//                    <div>
//                        <label for="ConfirmPassword">Повторите пароль</label><br />
//                        <input type="password" data-val="true" data-val-equalto="&#x41F;&#x430;&#x440;&#x43E;&#x43B;&#x44C; &#x432;&#x432;&#x435;&#x434;&#x435;&#x43D; &#x43D;&#x435;&#x432;&#x435;&#x440;&#x43D;&#x43E;" data-val-equalto-other="*.Password" id="ConfirmPassword" name="ConfirmPassword" />
//                        <span className="field-validation-valid" data-valmsg-for="ConfirmPassword" data-valmsg-replace="true" />
//                    </div>
//                    <div>
//                        <label for="FirstName">Введите Имя</label><br />
//                        <input type="text" data-val="true" data-val-required="&#x41D;&#x435; &#x443;&#x43A;&#x430;&#x437;&#x430;&#x43D;&#x43E; &#x418;&#x43C;&#x44F;" id="FirstName" name="FirstName" value="" />
//                        <span className="field-validation-valid" data-valmsg-for="FirstName" data-valmsg-replace="true" />
//                    </div>
//                    <div>
//                        <label for="SecondName">Введите Имя</label><br />
//                        <input type="text" data-val="true" data-val-required="&#x41D;&#x435; &#x443;&#x43A;&#x430;&#x437;&#x430;&#x43D;&#x430; &#x424;&#x430;&#x43C;&#x438;&#x43B;&#x438;&#x44F;" id="SecondName" name="SecondName" value="" />
//                        <span className="field-validation-valid" data-valmsg-for="SecondName" data-valmsg-replace="true" />
//                    </div>
//                    <div>
//                        <input type="submit" value="Регистрация" />
//                    </div>
//                </div>
//                <input name="__RequestVerificationToken" type="hidden" value="CfDJ8NSLP786ohpKgxiPhDaJNjJDJkDQgQ0Hm2HULLN6x_qCSzahe9-JlOIvA8wt9pvEJ-K5IjLr2D8skyjYKJmy6BboHIfYCGB_KXFCPjD_1N4r5E4jbQS_9cfpR9mpoBBDBdgTktd28b32NHusb7voq8o" />
//            </form>
//        );
//    }
//}

//// -- Авторизация -- 
//class LoginPage extends React.Component {
//    render() {
//        return (
//            <div>
//                <h1>Авторизация</h1>
//                <LoginPage />
//            </div>
//        )
//    }
//}



////-- Регистрация --

//class RegistryPage extends React.Component {
//    render() {
//        return (
//            <div>
//                <h1>Регистрация</h1>
//                <RegistryPage />
//            </div>
//        )
//    }
//}






//// -- Главная страница -- 
//class MainPage extends React.Component {
//    render() {
//        return (
//            <div>
//                <h1>Главная страница</h1>
//            </div>
//        )
//    }
//}




//// -- Верхняя менюшка --

//class Menu extends React.Component {
//    render() {
//        return (
//            <nav>
//                <ul>
//                    <li>
//                        <Link to="/">Главная</Link>
//                    </li>
//                    <li>
//                        <Link to="/Registry">Регистрация</Link>
//                    </li>
//                    <li>
//                        <Link to="/Login">Авторизация</Link>
//                    </li>
//                </ul>
//            </nav>
//        )
//    }
//}

//class Nav extends React.Component {
//    render() {
//        return <nav>
//            <Link to="/">Главная</Link>
//            <Link to="/Registry">О сайте</Link>
//            <Link to="/Login">Товары</Link>
//        </nav>;
//    }
//}

//class Navigation extends React.Component {
//    render() {
//        return (
//            <Router>
//                <div>
//                    <Nav />
//                    <Switch>
//                        <Route path="/" component={MainPage} />
//                        <Route path="/Registry" component={RegistryPage} />
//                        <Route path="/Login" component={LoginPage} />
//                    </Switch>
//                </div>                
//            </Router>
//        )
//    }
//}

//class App extends React.Component {
//    render() {
//        return (
//            <Navigation />
//            //<LoginForm />
//            //<RegistryForm />
//        );
//    }
//}


//ReactDOM.render(
//    <Router>
//        <div>
//            <Nav />
//            <Switch>
//                <Route exact path="/" component={MainPage} />
//                <Route path="/Registry" component={RegistryPage} />
//                <Route path="/Login" component={LoginPage} />
//            </Switch>
//        </div>
//    </Router>,
//    document.getElementById("app")
//);





//const listPrice = this.state.HistoryPriceShares.map(x => <div>
        //    <span>Цена: {x.Price}</span>
        //    <span>Дата изменения: {x.DateHistory}</span>
        //</div>);


//if (this.state.role == "Admin") {
//    return <div>
//        <h1>{this.state.CompanyName}</h1>
//        <img src={this.state.ImgSrc} />
//        <p>Страна: {this.state.Country.Name}</p>
//        <p>Текущая цена: {this.state.CurrentPrice}</p>

//    </div>
//} else if (this.state.role == "User") {
//    return <div>
//        <h1>{this.state.CompanyName}</h1>
//        <img src={this.state.ImgSrc} />
//        <p>Страна: {this.state.Country.Name}</p>
//        <p>Текущая цена: {this.state.CurrentPrice}</p>
//    </div>
//} else {
//    return <div>
//        <h1>{this.state.CompanyName}</h1>
//        <img src={this.state.ImgSrc} />
//        <p>Страна: {this.state.Country.Name}</p>
//        <p>Текущая цена: {this.state.CurrentPrice}</p>
//    </div>
//}