// Notas del archivo:
// - Secuencia de comando:
//      - Biomont SL Rep. Descuentos Sobre Ventas (customscript_bio_sl_rep_dessobven)

/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['./lib/Lib.ServerWidget', './lib/Lib.ReportManager', './lib/data/Lib.Basic', './lib/data/Lib.Helper', 'N'],

    function (ServerWidget, ReportManager, Basic, Helper, N) {

        const { log, file, encode } = N;

        /******************/

        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            if (scriptContext.request.method == 'GET') {

                let params = scriptContext.request.parameters;

                ServerWidget.setInput(params);
                ServerWidget.createReportForm();
                ServerWidget.createCriteriaGroup();

                let selectedReportHtml = '';
                switch (ServerWidget.selectedReport()) {
                    case Basic.DATA.Report.DESCUENTOS_SOBRE_VENTAS: {
                        log.debug('Start Report', '---- Presentacion Detallada ----')
                        // selectedReportHtml = 'prueba';
                        selectedReportHtml = new ReportManager.DescuentosSobreVentas(params).print();
                        log.debug('End Report', '---- Presentacion Detallada ----')
                        break;
                    }
                }

                if (params.xls == 'T') {
                    let base64fileEncodedString = encode.convert({
                        string: selectedReportHtml,
                        inputEncoding: encode.Encoding.UTF_8,
                        outputEncoding: encode.Encoding.BASE_64
                    });

                    scriptContext.response.writeFile(
                        file.create({
                            name: 'biomont_reporteDescuentoSobreVentas.xls',
                            fileType: file.Type.EXCEL,
                            encoding: file.Encoding.UTF_8,
                            contents: base64fileEncodedString
                        })
                    )
                } else {
                    ServerWidget.createViewerModel(selectedReportHtml);
                    let reportForm = ServerWidget.getForm();
                    scriptContext.response.writePage(reportForm);
                }
            } else if (scriptContext.request.method == 'POST') {
                ServerWidget.loadReportForm(scriptContext.request.parameters);
            }
        }

        return { onRequest }

    });
