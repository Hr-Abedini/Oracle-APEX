//====================================================================
//  Hr.Abedini - 1403/12/07
//====================================================================



//====================================================================
//====================================================================
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
