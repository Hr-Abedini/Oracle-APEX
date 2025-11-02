
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

