//====================================================================
//  Hr.Abedini - 1403/12/07
//
// 1404/03/03
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
//
//نام قبلی  => IG_SelectedValues
//
function IG_GetSelectedValues(ig) {
    try {

        let selectedRec = ig.data.selectedRecords;
        return selectedRec;

    } catch (error) {
        console.log(error);
        return 'err';
    }
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
 * @param {string} igId 
 * @return > IG
 */
function IG_GetIG_Grid(igId) {

    let igRegion = apex.region(igId).widget();
    let gridView = igRegion.interactiveGrid("getViews", "grid");
    return gridView;
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
    
    let gridView = IG_GetIG_Grid(igId);
    let model = gridView.model;

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
 * @param {string} elementId > المنتی که می‌خواهیم جای آن تغییر کند
 */
function IG_AddToToolbar_Start(elementId) {
    let groupNameID = 'my-group-elements'
    let innerDiv = $('#' + groupNameID)

    if (innerDiv.length == 0) {
        // console.log('x');
        innerDiv = $('<div></div>').attr('id', groupNameID).addClass('a-Toolbar-group');
    }

    innerDiv.append($(elementId));

    /*-----------------------------------*/
    let divTag = $('.a-Toolbar-groupContainer.a-Toolbar-groupContainer--start')
    divTag.append(innerDiv);
}


//====================================================================
//====================================================================
// End IG
//====================================================================
//====================================================================

