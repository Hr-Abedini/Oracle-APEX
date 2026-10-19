

/**
 * مدیریت دیاگرام‌های BPMN
 **/
window.bpmn = {

    /**
    * فرمت‌های مختلف پشتیبانی‌شده از عکس
    **/
    IMAGE_FORMAT: {
        PNG: 'image/png',
        JPEG: 'image/jpeg',
        WEBP: 'image/webp'
    },

    modeler: null,

    /**
     * مشخص کردن فضای نمایش مدل
     * @param containerId شناسه‌ی Container
     **/
    init: function (containerId) {

        this.modeler = new BpmnJS({
            container: `#${containerId}`
        });

    },

    /**
     * ایجاد دیاگرام جدید
     **/
    new: async function () {

        try {
            await this.modeler.createDiagram();

        } catch (err) {
            console.error('خطا در ایجاد دیاگرام:', err);
        }

    },

    /**
     * خواندن فایل بدون ارسال به سرور
     * @param fileBrowserId شناسه‌ی File Browser
     * @param outputId شناسه‌ی عنصر نمایش محتوا (اختیاری)
     **/
    readFile: async function (fileBrowserId, outputId) {

        const fileInput = document.getElementById(fileBrowserId);
        const file = fileInput.files[0];

        const content = file ? await file.text() : '';

        await this.load(content);

        if (!outputId)
            return;

        document.getElementById(outputId).textContent = content;

    },

    /**
     * بارگذاری دیاگرام با استفاده از XML
     * @param xml محتویات XML
     **/
    load: async function (xml) {

        try {
            await this.modeler.importXML(xml);
            this.modeler.get('canvas').zoom('fit-viewport');

        } catch (err) {
            console.error('خطا در بارگذاری دیاگرام:', err);
        }

    },

    /**
     * ارسال خروجی دیاگرام به یک عنصر
     * @param item شناسه‌ی عنصر دریافت‌کننده‌ی خروجی
     * @param format قالب‌بندی XML
     **/
    exportXMLToItem: async function (item, format = true) {

        try {
            const { xml } = await this.modeler.saveXML({ format });

            // apex.item(item).setValue(xml);
            document.getElementById(item).value = xml;

        } catch (err) {
            console.error('خطا در دریافت XML:', err);
        }

    },

    /**
     * دانلود فایل XML
     * @param filename نام فایل
     * @param format قالب‌بندی XML
     **/
    downloadXML: async function (filename = 'diagram.bpmn', format = true) {

        try {
            const { xml } = await this.modeler.saveXML({ format });

            const blob = new Blob([xml], {
                type: 'application/xml'
            });

            this.downloadBlob(blob, filename);

        } catch (err) {
            console.error('خطا در دانلود XML:', err);
        }

    },

    /**
     * دانلود فایل SVG
     * @param filename نام فایل
     **/
    downloadSVG: async function (filename = 'diagram.svg') {

        try {
            const { svg } = await this.modeler.saveSVG();

            const blob = new Blob([svg], {
                type: 'image/svg+xml'
            });

            this.downloadBlob(blob, filename);

        } catch (err) {
            console.error('خطا در دانلود SVG:', err);
        }

    },

    /**
     * دانلود تصویر با فرمت دلخواه
     * @param filename نام فایل
     * @param format فرمت تصویر
     **/
    downloadImage: async function (filename = 'diagram', format = 'image/png') {

        try {
            const { svg } = await this.modeler.saveSVG();

            // تبدیل SVG به تصویر
            const image = await this.svgToImage(svg);

            // ایجاد بوم نقاشی
            const canvas = document.createElement('canvas');

            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;

            // ترسیم تصویر روی بوم
            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);

            // تبدیل بوم به BLOB و دانلود فایل
            canvas.toBlob(blob => {
                try {
                    this.downloadBlob(blob, filename);
                } catch (err) {
                    console.error('خطا در دانلود تصویر:', err);
                }
            }, format);

        } catch (err) {
            console.error('خطا در تولید تصویر:', err);
        }

    },

    // ============================================================

    /**
     * تبدیل SVG به تصویر
     **/
    svgToImage: function (svg) {

        return new Promise((resolve, reject) => {

            const blob = new Blob([svg], {
                type: 'image/svg+xml;charset=utf-8'
            });

            const url = URL.createObjectURL(blob);
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

    },

    /**
     * تبدیل خروجی به فایل قابل دانلود
     **/
    downloadBlob: function (blob, filename) {

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

};
