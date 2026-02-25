
//====================================================================
//====================================================================
// Hr.Abedini - 1403/12/07
//
// Enhance Interactive Grid with Treegrid - v 1.0
// https://github.com/baldogiRichard/apex-treegrid-enhancement-for-ig
//====================================================================
//====================================================================

/**
 *  باز کردن درخت
 */
function EnhanceIG_ExpandTree() {
    $('span.apex-treegrid-expander-collapsed')
        .each(function () {
            $(this).removeClass('apex-treegrid-expander-collapsed')
                .addClass('apex-treegrid-expander-expanded')
        })

    // $('[class*="apex-treegrid-parent-"]').each(function () { $(this).removeAttr('style') });

    $('[class*="apex-treegrid-parent-"]').each(function () { this.style.removeProperty('display') });
}

/**
 * بستن درخت
 */
function EnhanceIG_CollapseTree() {
    $('span.apex-treegrid-expander-expanded')
        .each(function () {
            $(this).removeClass('apex-treegrid-expander-expanded')
                .addClass('apex-treegrid-expander-collapsed')
        })

    $('[class*="apex-treegrid-parent-"]').each(function () { $(this).css('display', 'none') });
}

//====================================================================
//  Hr.Abedini - 1403/12/07
//
// 1404/03/03
// 1404/07/13 - model, count ...
//====================================================================



//====================================================================
//====================================================================
// IG: Interactive Grid
//====================================================================
//====================================================================
/**
 * براساس ستون تعیین شده و سطر انتخاب شده 
 * 
 * اگر چند سطر انتخاب شده باشد، فقط سطر اول در نظر گرفته می شود
 * 
 * Dynamic Actions => When | Evenet: Selection Chnage [Interactive Grid]
 * 
 * @param  ig > this 
 * @param {string} colName > نام ستون - حساس به حروف کوچک و بزرگ
 * @returns > مقدار ستون اعلام شده
 */
//
//نام قبلی  => IG_SelectedValue
//
function IG_GetSelectedValue(ig, colName) {
    try {

        let result = null;
        let model = ig.data.model;
        let selectedRec = ig.data.selectedRecords;

        //----------------------------------------------------
        // اندیس ستون
        // let columnIndex = model.getFieldKey(colName);
        //----------------------------------------------------
        // let record = model.getRecord(1); // شماره سطر
        // if (record != null)
        //     console.log(record[columnIndex]); 
        //----------------------------------------------------

        if (selectedRec.length > 0) {
            result = model.getValue(selectedRec[0], colName);
            //result = records[0][columnIndex];            
        }

        return result;

    } catch (error) {
        console.log(error);
        return 'err';
    }
}

/**
 * دریافت ردیف (های) انتخاب شده
 * 
 * @param {*} ig > this
 */
function ig_GetSelectedRows(ig) {

    let selectedRec = ig.data.selectedRecords;
    return selectedRec;
}

/**
 * دریافت مقدار(ها) ستون مشخص شده از ردیف‌(های) انتخاب شده
 * @param {*} ig > this
 * @param {string} colName > نام فیلد مورد نظر
 */

function ig_SelectedRowsColumnValues(ig, colName) {

    let selectedRecords = ig.data.selectedRecords;
    let model = ig.data.model;
    let vals = selectedRecords.map
        (function (record) {
            return model.getValue(record, colName);
        }
        );

    return vals;
}


/**
 * LOV دریافت مقدار
 * 
 * @param {*} ig > this
 * @param {string} colName > نام ستونی که از نوع لیست است
 * @return > LOV Value
 */
//
//نام قبلی  => IG_SelectedValue_LOV
//
function IG_GetSelectedValue_LOV(ig, colName) {

    let lovObject = IG_GetSelectedValue(ig, colName);
    return lovObject.v;
    // lovObject.d;

}
//
//====================================================================
//

/**
 * @param {string} igId  > static id
 * @return > IG View
 */
function IG_GetView(igId) {

    let igRegion = apex.region(igId).widget();
    let gridView = igRegion.interactiveGrid("getViews", "grid");
    return gridView;
}


/**
 * @param {string} igId  > static id
 * @return > IG Model
 */
function IG_GetModel(igId) {

    let gridView = IG_GetView(igId);
    let model = gridView.model;

    return model;
}


/**
 * شماره ستون، در حالت طراحی
 * 
 *  براساس ترتیب چینش
 * 
 * @param {string} igId 
 * @param {string} colName 
 */
//نام قبلی  => IG_ColumnIndex_Design
function IG_GetColumnIndex_InDesign(igId, colName) {

    let model = IG_GetModel(igId);
    let colIndex = model.getFieldKey(colName);

    return colIndex;
}

/** 
 * شماره ستون، در صفحه وب
 * 
 * @param {string} igId 
 * @param {string} colId 
 */
//نام قبلی  => IG_ColumnIndex_Page
function IG_GetColumnIndex_InPage(igId, colId) {

    // th (parent) -> span : id= ..._HDR
    let findBy = '#' + igId + ' #' + colId + '_HDR';
    // براساس th مورد نیاز است
    var colIndex = $(findBy).parent().index();

    return colIndex;
}

/**
 * دریافت اطلاعات مربوط به سلول انتخاب شده
 * 
 * @param {string} Id 
 */
function IG_GetSelectedCellInfo(id) {

    id = '#' + id;
    let table = $(id + " .a-IG-body .a-GV-bdy table");
    let headerCells = $(id + " .a-GV-hdr th");

    // سلول انتخاب‌شده (focus شده)
    let focusedCell = table.find("td.is-focused");

    // بررسی اینکه سلولی فعال هست یا نه
    if (focusedCell.length === 0) {
        return null; // اگر سلول فعال نداشتیم
    }


    let cellIndex = focusedCell.index(); // شماره ستون
    let cellText = focusedCell.text().trim(); // مقدار داخل سلول


    // پیدا کردن عنوان ستون بر اساس cellIndex
    let headerText = headerCells.eq(cellIndex).text();
    let rawHtml = headerCells.eq(cellIndex).html().trim();
    let headerHtmlText = rawHtml;
    // let headerHtmlText = rawHtml.replace(/<br\s*\/?>/gi, '\n')   // تبدیل <br> به newline
    //     .replace(/<[^>]+>/g, '');         // حذف باقی تگ‌های HTML


    // سطر انتخاب‌شده (با کلاس is-selected)
    let selectedRow = table.find("tr.is-selected");
    let rowIndex = selectedRow.index(); // شماره سطر


    return {
        headerHtmlText,
        headerText,
        cellText,
        rowIndex,
        cellIndex,

    };

}
//
//====================================================================
//
/**
 *  پیدا شده cell مربوط به style جستجوی مقدار و تغییر
 * 
 * @param {string} igId 
 * @param {number} colIndex 
 * @param {*} searchByVal 
 * @param {string} className 
 */
function IG_ChangeCellStyle(igId, colIndex, searchByVal, className) {

    //Path: (igId)... div.a-IG-body
    let findBy = '#' + igId + ' .a-IG-body'

    $(findBy).find("tbody")
        // .find("td")
        .find("td:nth-child(" + colIndex + ")")
        .filter(function () {
            return $(this).text() === searchByVal;
        }).addClass(className);

    //.css({"background-color":  "rgb(253, 224, 224)"});
    //.css("background-color", "rgb(253, 224, 224)")
}

/**
 * پیدا شده cell مربوط به style جستجوی مقدار و تغییر
 * 
 *  (IG در صورت رفتن به صفحه دیگری از) observer استفاده از
 * 
 * 
 * @param {string} igId 
 * @param {string} colId 
 * @param {*} searchByVal 
 * @param {string} className 
 */

function IG_ChangeCellStyle_ByObserver(igId, colId, searchByVal, className) {

    let targetNode = document.getElementById(igId);

    //let targetNode = $('#' + targetNodeId )[0];
    let config = { childList: true, subtree: true };
    let colIndex = IG_GetColumnIndex_InPage(igId, colId) + 1;

    //characterData: true
    // نشانی تابع
    let callback = function (mutationsList, observer) {
        // for (var mutation of mutationsList) {
        // if (mutation.type === 'attributes') {
        //     // تغییر در ویژگی‌های گره
        //     console.log('تغییر در ویژگی ' + mutation.attributeName);
        //   }        

        IG_ChangeCellStyle(igId, colIndex, searchByVal, className);

    };

    // ایجاد ناظر
    var observer = new MutationObserver(callback);
    // شروع نظارت
    observer.observe(targetNode, config);
}



/**
 * 
 *  پیدا شده row مربوط به style جستجوی مقدار و تغییر
 * 
 * @param {string} igId
 * @param {string} colId
 * @param searchByVal
 * @param {string} className
 */
function IG_ChangeRowStyle(igId, colId, searchByVal, className) {

    try {
        let colIndex = IG_GetColumnIndex_InPage(igId, colId) + 1;
        let targetNode = $("#" + igId + " .a-IG-body tr");

        targetNode.filter(function () {
            // براساس ش. ستون
            let result = $(this).find("td:nth-child(" + colIndex + ")").text() === searchByVal;
            return result;

        }).find('td').addClass(className);



        // target.each(function () {
        //     $(this).find("td").each(function () {
        //         console.log($(this).attr("id"));

        //         if ($(this).attr("id") === colID && $(this).text() === columnValue) { // بجای columnId آی دی ستون خود را قرار دهید
        //             console.log($(this).text());
        //         }
        //     });
        // });
    }
    catch (error) {
        console.log('err');
    }
}


/**
 *  Toolbar تغییر جای المان به داخل
 * * محل استفاده: Page | Execute when Page Loads 
 * @param {string} igId > Interactive Grid شناسه
 * @param {string} elementId > المنتی که می‌خواهیم جای آن تغییر کند
 */
function ig_AddToToolbar_Start(igId, elementId) {
    let groupNameID = 'my-group-elements'
    let $innerDiv = $('#' + groupNameID)
    let $element = $('#' + elementId);

    if ($innerDiv.length == 0) {
        // console.log('x');
        $innerDiv = $('<div></div>').attr('id', groupNameID).addClass('a-Toolbar-group');
    }

    $innerDiv.append($element);

    /*-----------------------------------*/
    let divTag = $('#' + igId + ' .a-Toolbar-groupContainer.a-Toolbar-groupContainer--start')

    divTag.append($innerDiv);
}


/**
 *  تعداد رکوردهای موجود
 *  @param {string} igId
 */
function IG_RowCount(igId) {
    let model = IG_GetModel(igId);
    let rowCount = model.getTotalRecordsCount();

    return rowCount;
}


/**
 *  تعداد رکوردهای درج شده
 *  @param {string} igId
 */
function IG_RowCount_Inserted(igId) {
    let model = IG_GetModel(igId);
    let insertedRecords = model.getChanges().inserted;
    let rowCount = insertedRecords ? insertedRecords.length : 0;

    return rowCount;
}



// -----------------------------------------------------------------------------
// actions
// -----------------------------------------------------------------------------
/**
 *  دریافت اکشن های قابل استفاده
 *  @param {string} igId
 *  @return > apex.actions
 */
function ig_GetActions(igId) {
    let ig$ = apex.region(igId).widget();
    let actions = ig$.interactiveGrid("getActions");

    // console.log(actions);
    return actions;
}

/**
 * ثبت تغییرات 
 * 
 * برای زمانی مناسب است که بخواهیم با استفاده از دکمه ثبت خودمان، این کار را انجام دهیم
 *  @param {string} igId
 */
function IG_Save(igId) {
    let actions = ig_GetActions(igId);
    actions.invoke("save");
}

/**
 * اضافه کردن رکورد به ابتدا
 *  @param {string} igId
 */
function IG_AddRowAtStart(igId) {

    let ig$ = apex.region(igId).widget();
    let actions = ig_GetActions(igId);

    ig$.interactiveGrid("setSelectedRecords", []);
    actions.invoke("selection-add-row");
}


/**
 *  اضافه کردن رکورد به انتها
  *  @param {string} igId
 */
function IG_AddRowAtEnd(igId) {

    let ig$ = apex.region(igId).widget();
    let actions = ig_GetActions(igId); //ig$.interactiveGrid("getActions");
    let grid$ = ig$.interactiveGrid("getViews").grid.view$;

    // 
    // if (!grid$ || !actions) {
    //     console.error("IG not ready:", igId);
    //     return;
    // }

    // انتخاب آخرین ردیف
    grid$.grid("setSelection", grid$.find("tr").last());

    // اجرای اکشن پیش‌فرض اضافه‌کردن ردیف
    actions.invoke("selection-add-row");
}

/**
 *  اضافه کردن رکورد به ابتدا / انتها با استفاده از دکمه 
 * 
 * استفاده در: Execute when Page Loads
 * @param {string} igId
 * @param position > start / end
 */

function IG_AddRowByAddButton(igId, position) {

    var ig$ = apex.region(igId).widget();

    // پیدا کردن دکمه Add Row داخل toolbar IG
    var addBtn = ig$.find("button[data-action='selection-add-row']");

    if (!addBtn.length) {
        console.warn("Add Row button not found inside IG:", igId);
        return;
    }

    position = position.toLowerCase(position);

    addBtn.off("click.custom").on("click.custom", function (e) {
        e.stopImmediatePropagation(); // جلوگیری از اجرای handler داخلی
        e.preventDefault();            // جلوگیری از رفتار پیش‌فرض       

        switch (position) {
            case 'start':
                IG_AddRowAtStart(igId);
                break;
            case 'end':
                IG_AddRowAtEnd(igId);
                break;
            default:
                console.error('Invalid position: ' + position);
        }

    });

}


//====================================================================
//====================================================================
// End IG
//====================================================================
//====================================================================


//====================================================================
//====================================================================
// Hr.Abedini - 1403/12/07
// IR: Interactive Report
//====================================================================
//====================================================================
/**
 *  تغییر رنگ سطر در صورت پیدا کردن مقدار
 * 
 * @param {string} irID 
 * @param {string} colId 
 * @param {*} searchByVal 
 * @param {string} className 
 * @param {string} setTrId > برای زمانی که بخواهیم  رنگ دلخواه بر روی این سطر اعمال شود
 */
function IR_ChangeRowStyle(irID, colId, searchByVal, className) {
    let findBy = '#' + irID + ' td[headers=' + colId + ']'

    console.log(findBy);
    $(findBy).each(function () {
        let cellVal = $(this).text().toLowerCase();
        searchByVal = searchByVal.toLowerCase();

        if (cellVal === searchByVal) {
            // $(this).parent()
            //     .children()
            //     .addClass(className);

            $(this).parent()
                .addClass(className);

            //tr
            //   $(this).parent().attr('id',setTrId);
            //  console.log($(this).parent());
        }


    });

}



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


//====================================================================

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

//====================================================================
// Shuttle
//====================================================================
//--------------------------------------------------------------------
// shuttle | filter
//--------------------------------------------------------------------
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
 * توسط متدهای دیگر فراخوانی می‌شود
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

        //options[i].style.display = optionText.includes(searchText) ? "" : "none";
    }
}

//--------------------------------------------------------------------
// shuttle | move 
//--------------------------------------------------------------------

/**
 * فعال کردن انتقال از لیست یک به دو
 * move all بازنویسی دکمه
 * @param {string} shuttleName 
 */
function item_Shuttle_MoveAllButton(shuttleName) {
    //ltr: left to right
    item_Shuttle_MoveAll(shuttleName, 'ltr');
}

/**
 * فعال کردن انتقال از لیست دو به یک
 * remove all بازنویسی دکمه
 * @param {string} shuttleName 
 */
function item_Shuttle_RemoveAllButton(shuttleName) {  
    //rtl: right to left
    item_Shuttle_MoveAll(shuttleName, 'rtl');
}

/**
 * در زمان فیلتر کردن ستون چپ یا راست move all, remove all بازنویسی دکمه 
 * در این حالت مقادیری که فیلتر شده‌اند نباید به ستون کناری منتقل شوند
 * @param {string} shuttleName  > نام شاتل      
 * @param {string} moveType     > سمت حرکت (ltr, rtl)

 */
function item_Shuttle_MoveAll(shuttleName, moveType) {
    //ltr: left to right
    //rtl: right to left
    const moveAllBtn = document.getElementById(shuttleName + (moveType == 'ltr' ? '_MOVE_ALL' : '_REMOVE_ALL'));

    moveAllBtn.addEventListener("click",
        function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            const source = document.getElementById(shuttleName + (moveType == 'ltr' ? '_LEFT' : '_RIGHT'));
            const target = document.getElementById(shuttleName + (moveType == 'ltr' ? '_RIGHT' : '_LEFT'));
              
           
            for (let i = source.options.length - 1; i >= 0; i--) {
                const option = source.options[i];
                if (!option.hidden) {
                    target.add(option);
                }
            }
        }, true); // capture phase
}


//--------------------------------------------------------------------
// shuttle | count
//--------------------------------------------------------------------
/**
 * بدست آوردن تعداد آیتم‌های لیست 1
 * @param {string} shuttleName > نام شاتل 
 */
function item_Shuttle_CountOfLeftSide(shuttleName) {
    let leftSide = shuttleName + '_LEFT';
    let count = item_Shuttle_Count(leftSide);
    
    return count;
}

/**
 * بدست آوردن تعداد آیتم‌های لیست 2
 * @param {string} shuttleName > نام شاتل 
 */
function item_Shuttle_CountOfRightSide(shuttleName) {
    let rightSide = shuttleName + '_RIGHT';
    let count = item_Shuttle_Count(rightSide);

    return count;
}

/**
 * متد دریافت تعداد آیتم‌های لیست چپ(1) یا راست(2) شاتل
 * توسط دو متد دیگر فراخوانی می‌شود
 * @param {string} shuttleSideName  > نام "آیتم لیست" مورد نظر
 */
function item_Shuttle_Count(shuttleSideName) {    
    const selectEl = document.getElementById(shuttleSideName);
    const options = selectEl.options;

    return options.length; 
}

//====================================================================
// 
//====================================================================