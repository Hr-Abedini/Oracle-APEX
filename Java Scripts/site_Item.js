

/**
 * تغییر متن => بزرگ، کوچک، بزرگ کردن حروف اول
 * 
 * @param {string} textVal > متن مورد نظر
 * @param {string} textMode > حالت (0 => capital, 1 => upper, 2=> lower)
 *   
 * @returns > مقدار اصلاح شده
 */
function changeTextMode(textVal, textMode) {

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
function item_NumericSpinner(itemName, wheel_step = 10, ud_step = 1, negative = false, groupingSymbol = ',') {

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

    btnUp$.on("click", inc.bind(null, ud_step));
    btnDown$.on("click", dec.bind(null, ud_step));

    item$.on("wheel", function (e) {

        if (document.activeElement.id !== itemName) return;

        e.preventDefault();
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
 * @param {string} itemName > نام آیتم
 * @param tagType > نوع تگ مورد استفاده (a , button)
 * 
 * @param {Object} options - تنظیمات اختیاری برای عنصر.
 * @param {string} [options.text] 
 * @param {string} [options.class]
 * @param {Object|string} [options.style]
 * ---------------------------------------------------------- 
 * @examples >
    1. item_ChangeTextMode('P10_NAME','a')
    2. item_ChangeTextMode('P10_NAME','button'}
    3. item_ChangeTextMode('P10_NAME','button',{class:'btn-txt-mode',text:'Aa',style: { color: "white", backgroundColor: "#007bff" }})
    4. item_ChangeTextMode('P10_NAME','button',{style: "text-decoration:none; color:red;"})
  */
function item_ChangeTextMode(itemName, tagType = 'a', options = {}) {

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
        let result = changeTextMode(val, textMode);
        apex.item(itemName).setValue(result);

        $(this).attr('title', modes[textMode]);
        $(this).attr('data-mode', textMode);
    });

    containter$.html(element$);
}

// -------------------------------------------------------------------------------
// Shuttle
// -------------------------------------------------------------------------------
/**
 * فیلتر کردن مقادیر ستون چپ (اول)
 *  
 * @param {string} searchItemName   > نام آیتم جستجو    
 * @param {string} shuttleName      > نام شاتل        
 */
function item_Shuttle_FilterLeftSide(searchItemName, shuttleName) {
    let leftSide = shuttleName + '_LEFT';
    item_Shuttle_Filter(searchItemName, leftSide);
}

/**
 * فیلتر کردن مقادیر ستون راست (دوم)
 *  
 * @param {string} searchItemName   > نام آیتم جستجو    
 * @param {string} shuttleName      > نام شاتل        
 */
function item_Shuttle_FilterRightSide(searchItemName, shuttleName) {
    let rightSide = shuttleName + '_RIGHT';
    item_Shuttle_Filter(searchItemName, rightSide);
}

/**
 * جستجو در شاتل چپ یا راست
 * 
 * @param {string} searchItemName   > نام آیتم جستجو    
 * @param {string} shuttleSideName  > نام ستون شاتل (_LEFT, _RIGHT)
 */
function item_Shuttle_Filter(searchItemName, shuttleSideName) {
    const searchText = apex.item(searchItemName).getValue().toLowerCase();
    const selectEl = document.getElementById(shuttleSideName);
    const options = selectEl.options;

    for (let i = 0; i < options.length; i++) {
        const optionText = options[i].text.toLowerCase();
        options[i].hidden = !optionText.includes(searchText);

        // options[i].style.display = optionText.includes(searchText) ? "" : "none";
    }
}


function item_Shuttle_CountOfLeftSide(shuttleName) {
    let leftSide = shuttleName + '_LEFT';
    let count = item_Shuttle_Count(leftSide);
    
    return count;
}

function item_Shuttle_CountOfRightSide(shuttleName) {
    let rightSide = shuttleName + '_RIGHT';
    let count = item_Shuttle_Count(rightSide);

    return count;
}

function item_Shuttle_Count(shuttleSideName) {    
    const selectEl = document.getElementById(shuttleSideName);
    const options = selectEl.options;

    return options.length; 
}



function item_Shuttle_MoveLeftToRight(shuttleName) {
    item_Shuttle_MoveAll(shuttleName, 'ltr');
}

function item_Shuttle_MoveRightToLeft(shuttleName) {  
    item_Shuttle_MoveAll(shuttleName, 'rtl');
}
/**
 * در زمان فیلتر کردن ستون چپ یا راست move all, remove all بازنویسی دکمه 
 * در این حالت مقادیری که فیلتر شده‌اند نباید به ستون کناری منتقل شوند
 * @param {string} shuttleName  > نام شاتل      
 * @param {string} moveType     > سمت حرکت (ltr, rtl)

 ** ltr : Left to Right
 ** rtl : Right to Left
 */
function item_Shuttle_MoveAll(shuttleName, moveType) {
    const moveAllBtn = document.getElementById(shuttleName + (moveType == 'ltr' ? '_MOVE_ALL' : '_REMOVE_ALL'));

    moveAllBtn.addEventListener("click",
        function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            const source = document.getElementById(shuttleName + (moveType == 'ltr' ? '_LEFT' : '_RIGHT'));
            const target = document.getElementById(shuttleName + (moveType == 'ltr' ? '_RIGHT' : '_LEFT'));

              console.log(moveType);
           
            for (let i = source.options.length - 1; i >= 0; i--) {
                const option = source.options[i];
                if (!option.hidden) {
                    target.add(option);
                }
            }
        }, true); // capture phase
}