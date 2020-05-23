class AddShareForm extends React.Component {
    render() {
        return (
            <form action="/api/AddShare" method="post">
                <div className="form-group">
                    <label className="control-label" for="CompanyName">Название Компании</label>
                    <input type="text" className="form-control" id="CompanyName" name="CompanyName" value="" />
                </div>
                <div className="form-group">
                    <label className="control-label">Страна : </label>
                    <select name="CountryId" className="form-control">
                        <option value="1">&#x420;&#x43E;&#x441;&#x441;&#x438;&#x44F;</option>
                        <option value="2">&#x421;&#x428;&#x410;</option>
                        <option value="3">&#x42E;&#x436;&#x43D;&#x430;&#x44F; &#x41A;&#x43E;&#x440;&#x435;&#x44F;</option>
                        <option value="4">&#x41A;&#x438;&#x442;&#x430;&#x439;</option>
                        <option value="5">&#x42F;&#x43F;&#x43E;&#x43D;&#x438;&#x44F;</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="control-label" for="ImgSrc">Картинка</label>
                    <input type="text" className="form-control" id="ImgSrc" name="ImgSrc" value="" />
                </div>
                <div class="form-group">
                    <label className="control-label" for="CurrentPrice">Стоимость акции</label>
                    <input type="number" className="form-control" data-val="true" data-val-number="The field CurrentPrice must be a number." data-val-required="The CurrentPrice field is required." id="CurrentPrice" name="CurrentPrice" value="0" />
                </div>
                <div className="form-group">
                    <input type="submit" value="Отправить" className="btn btn-default" />
                </div>
                <input name="__RequestVerificationToken" type="hidden" value="CfDJ8NSLP786ohpKgxiPhDaJNjKtu1_ySET56cv95g1BKn_MpLUBELPJNg1rJPGFa-Vr6JhmzAf-wYfpWwnO1R56VdHdNPI120WbDLGr47TMWQScCbR5uJfFQu8FomYWa-vOeoSniup_Wicc8RlzLqq0I_A" />
            </form>
        );
    }
}