
//====================================================================
//====================================================================
// Hr.Abedini - 1404/09/10
// Item
//====================================================================
//====================================================================


/**
 * تغییر متن => بزرگ، کوچک، بزرگ کردن حروف اول
 * 
 * @param {string} textVal > متن مورد نظر
 * @param {string} textMode > حالت (0 => capital, 1 => upper, 2=> lower)
 *   
 * @returns > مقدار اصلاح شده
 */
function ChangeTextMode(textVal, textMode) {

    let result;

    if (textMode === 0) {
        result = textVal.toLowerCase().replace(/(^|[^a-zA-Z])([a-zA-Z])/g, (match, p1, p2) => { return p1 + p2.toUpperCase(); });
    } else if (textMode === 1) {
        result = textVal.toUpperCase(); // Upper
    } else if (textMode === 2) {
        result = textVal.toLowerCase(); // Lower
    }

    return result;
}



/**
 * ایجاد حالت +/- کردن به فیلد عددی
 * 
 ** type: number field
 ** برای قرارگرفتن دکمه > post text = *
 * 
 * 
 * @param itemName > نام آیتم
 * @param wheel_step >  مقداری که با چرخ موس باید اضافه/کم شود
 * @param ud_step > up-down مقداری که باید اضافه/کم شود
 * @param negative > باشد false جلوگیری از مقدار منفی اگر مقدار
 * @param groupingSymbol > کاراکتر جداکننده ارقام
 */
function Item_NumericSpinner(itemName, wheel_step = 10, ud_step = 1, negative = false, groupingSymbol = ',') {

    //  ** css: btn-container-spin, btn-inc, btn-dec
    // let btn = '<div class="btn-container-spin">    <button type="button" class="btn-inc">▲</button>      <button type="button" class="btn-dec">▼</button>  </div>'
    // let container = "#" + itemName + "_CONTAINER";
    // let containter$ = $("#" + itemName + "_CONTAINER .t-Form-itemText--post");

    // containter$.html(btn);
    // // بعد از اضافه شدن
    // let btnUp$ = $(container + " .btn-inc");
    // let btnDown$ = $(container + " .btn-dec");
    //----------------------------------------------
    let containter$ = $("#" + itemName + "_CONTAINER .t-Form-itemText--post");

    let css_btn = { background: "none", border: "none", cursor: "pointer" };
    let css_div = { display: "inline-flex", "flex-direction": "column", "vertical-align": "middle" };

    let div$ = $('<div>').css(css_div);
    let btnUp$ = $('<button>', { type: "button", text: '▲' }).css(css_btn);
    let btnDown$ = $('<button>', { type: "button", text: '▼' }).css(css_btn);

    div$.append(btnUp$);
    div$.append(btnDown$);
    containter$.html(div$);
    //----------------------------------------------
    let item$ = $("#" + itemName);

    btnUp$.on("click",  inc.bind(null,ud_step));
    btnDown$.on("click", dec.bind(null,ud_step));

    item$.on("wheel", function (e) {
        e.preventDefault();

        // آیا فوکوس دارد؟
        if (document.activeElement.id !== itemName) 
            return;
        
        let delta = e.originalEvent.deltaY;

        if (delta < 0) {
            inc(wheel_step);
        } else {
            dec(wheel_step);
        }

    });

    function inc(step) {
        let val = parseFloat(item$.val().replace(groupingSymbol, '')) || 0;
        item$.val(val + step);
        // apex.item(itemName).setValue(item$.val());
    }

    function dec(step) {
        let val = parseFloat(item$.val().replace(groupingSymbol, '')) || 0;
       
        val = val - step
        if (negative == false & val < 0) val = 0;

        item$.val(val);
        // apex.item(itemName).setValue(item$.val());         
    }
}




/**
 * تغییر حالت کلمات: حرف اول بزرگ، بزگ، کوچک
 * 
 ** APEX
 *   * type: text field
 *   * post text = *
 *   * Item Post Text = Display as Block
 * 
 * @param itemName > نام آیتم
 * @param tagType > نوع تگ مورد استفاده (a , button)
 * @param {Object} [options] - تنظیمات اختیاری برای عنصر.
 * @param {string} [options.text] 
 * @param {string} [options.class]
 * @param {Object|string} [options.style]
 * ---------------------------------------------------------- 
 * @examples >
    1. Item_ChangeTextMode('P10_NAME','a')
    2. Item_ChangeTextMode('P10_NAME','button'}
    3. Item_ChangeTextMode('P10_NAME','button',{class:'btn-txt-mode',text:'Aa',style: { color: "white", backgroundColor: "#007bff" }})
    4. Item_ChangeTextMode('P10_NAME','button',{style: "text-decoration:none; color:red;"})
  */
function Item_ChangeTextMode(itemName, tagType = 'a', options = {}) {

    let icon = " fa fa-change-case ";
    let containter$ = $("#" + itemName + "_CONTAINER .t-Form-itemText--post");
    let modes = ['Capital', 'UPPER', 'lower'];


    const element$ = $(`<${tagType}>`, {
        href: tagType === "a" ? "javascript:void(0)" : undefined,
        type: tagType === "button" ? "button" : undefined,
        class: options.class || icon,
        text: options.text || "",
        "data-mode": 0
    });

    if (options.style) {
        if (typeof options.style === "string") {
            element$.attr("style", options.style);
        } else if (typeof options.style === "object") {
            element$.css(options.style);
        }
    }

    element$.on("click", function () {
        let val = apex.item(itemName).getValue();
        let textMode = $(this).attr("data-mode");

        // بروزرسانی مرحله بعدی
        //mode <0  => math.abs
        textMode = (textMode + 1) % 3;
        let result = ChangeTextMode(val, textMode);
        apex.item(itemName).setValue(result);

        $(this).attr('title', modes[textMode]);
        $(this).attr('data-mode', textMode);
    });

    containter$.html(element$);
}
