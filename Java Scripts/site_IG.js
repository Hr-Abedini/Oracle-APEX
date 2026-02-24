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

