//=============================================================

bpmn_init('bpmnContainer')
// برای اینکه دیاگرام در صفحه قابل استفاده باشد
// در زمان لود صفحه باید اجرا شود
bpmn_new();


//=============================================================

/**
 *  فرمت‌های مختلف پشتیبانی شده از عکس 
 **/
const IMAGE_FORMAT = {
    PNG: 'image/png',
    JPEG: 'image/jpeg',
    WEBP: 'image/webp'
};

/**
* مشخص کردن فضای نمایش مدل
**/
function bpmn_init (containerId) {
    this.modeler = new BpmnJS({
        container: `#${containerId}`
    });
}

/**
* ایجاد دیاگرام جدید
**/
async function bpmn_new() {
    try {
        await modeler.createDiagram();
        // modeler.get('canvas').zoom('fit-viewport');

    } catch (err) {
        console.error('خطا در ایجاد دیاگرام:', err);
    }
}

/**
 * خواندن فایل بدون ارسال به سرور
 * @param fileBrowserId 
 * @param outputId > نام آیتم
 **/
async function bpmn_readFile(fileBrowserId, outputId) {

    const fileInput = document.getElementById(fileBrowserId);
    const file = fileInput.files[0];

    const content = file ? await file.text() : '';
    await bpmn_load(content);

    if (!outputId)
        return;

    document.getElementById(outputId).textContent = content;

};

/**
 * xml بارگذاری دیاگرام با استفاده از قالب 
 * @param xml > محتویات xml
 **/
async function bpmn_load(xml) {

    try {
        await modeler.importXML(xml);
        modeler.get('canvas').zoom('fit-viewport');

    } catch (err) {
        console.error('خطا در بارگذاری دیاگرام:', err);
    }
}

/**
 * ارسال خروجی دیاگرام به یک آیتم
 * @param item > نام آیتم مورد نظر جهت دریافت خروجی
 * @param format > خروجی فرمت بشود یا خیر
 **/
async function bpmn_exportXMLToItem(item, format = true) {

    try {
        const { xml } = await modeler.saveXML({ format });
        // apex.item(item).setValue(xml);
        document.getElementById(item).value = xml;

    } catch (err) {
        console.error('خطا در دریافت XML:', err);
    }
}


async function bpmn_downloadXML(filename = 'diagram.bpmn', format = true) {

    try {
        const { xml } = await modeler.saveXML({ format });
        const blob = new Blob([xml], {
            type: 'application/xml'
        });

        downloadBlob(blob, filename);

    } catch (err) {
        console.error('خطا در دانلود XML:', err);
    }

}

async function bpmn_downloadSVG(filename = 'diagram.svg') {

    try {
        const { svg } = await modeler.saveSVG();
        const blob = new Blob([svg], {
            type: 'image/svg+xml'
        });

        downloadBlob(blob, filename);

    } catch (err) {
        console.error('خطا در دانلود SVG:', err);
    }

}


async function bpmn_downloadImage(
    filename = 'diagram', format = IMAGE_FORMAT.PNG) {
    try {

        const { svg } = await modeler.saveSVG();
        // دریافت تصویر
        const image = await svgToImage(svg);
        // بوم نقاشی خالی ;D
        const canvas = document.createElement('canvas');

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        // تصویرسازی دوبعدی
        const context = canvas.getContext('2d');
        //  شروع ترسیم از نقطه صفر بوم
        context.drawImage(image, 0, 0);
        // ایجاد BLOB
        canvas.toBlob(blob => {
            // پس از ساخت، دانلود فایل
            downloadBlob(blob, filename);
        }, format);

    } catch (err) {
        console.error('خطا در تولید تصویر:', err);
    }

}

// ============================================================

/**
 * به عکس svg تبدیل فرمت 
 * جهت استفاده در فرمت‌های خروجی عکس
 **/
function svgToImage(svg) {

    // Promise در وضعیت pending باقی می‌ماند تا resolve یا reject شود.
    return new Promise((resolve, reject) => {
        // svg -> blob
        const blob = new Blob([svg], {
            type: 'image/svg+xml;charset=utf-8'
        });

        const url = URL.createObjectURL(blob);
        //
        // ساخت عکس
        //
        const image = new Image();

        image.onload = function () {

            URL.revokeObjectURL(url);
            resolve(image);

        };

        image.onerror = function () {
            URL.revokeObjectURL(url);
            reject(new Error('خطا در تبدیل SVG به تصویر'));
        };

        image.src = url;
    });

}

/**
 * تبدیل خروجی‌ها به فایل قابل دانلود
 **/
function downloadBlob(blob, filename) {

    if (!blob) {
        throw new Error('Blob ایجاد نشد.');
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
}





