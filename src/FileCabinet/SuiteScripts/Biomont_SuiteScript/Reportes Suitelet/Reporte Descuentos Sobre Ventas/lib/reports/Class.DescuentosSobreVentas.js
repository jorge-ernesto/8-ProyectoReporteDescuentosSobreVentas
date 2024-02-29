/**
 * @NApiVersion 2.1
 */
define(['./Class.ReportRenderer', '../data/Lib.Basic', '../data/Lib.Search', '../data/Lib.Process', '../data/Lib.Helper', 'N'],

    function (ReportRenderer, Basic, Search, Process, Helper, N) {

        const { log } = N;

        /******************/

        class DescuentosSobreVentas extends ReportRenderer {

            constructor(params) {
                // Enviamos template a ReportRenderer
                if (params.xls === 'T') {
                    super(Basic.DATA.Report.DESCUENTOS_SOBRE_VENTAS_XLS);
                } else {
                    super(Basic.DATA.Report.DESCUENTOS_SOBRE_VENTAS);
                }

                // Obtener parametros
                let { subsidiary, view, year, month } = params;

                // Debug
                // Helper.error_log('params', params);

                // Obtener datos para enviar
                let dataPeriodos = Search.getPeriodos(subsidiary, view, year, month)
                let dataDescuentoVtas_FacturasAgrupadas = Search.getDescuentoVtas_Facturas(subsidiary, dataPeriodos['periodsId']); // Esto es un array de detalle
                let dataDescuentoVtas_NCDetalladas = Search.getDescuentoVtas_NC(subsidiary, dataPeriodos['periodsId']); // Esto es un array de detalle
                let dataDescuentoVtas = Process.getDescuentoVtas(dataDescuentoVtas_FacturasAgrupadas, dataDescuentoVtas_NCDetalladas); // Esto es un array de detalle
                dataDescuentoVtas = Process.getDescuentoVtasAgrupadoDetallado(dataDescuentoVtas); // Aca se convierte en un JSON agrupado

                // Procesar reporte
                let dataReporte = Process.getReporteFreeMarker(dataDescuentoVtas);

                // Debug
                // Helper.error_log('dataPeriodos', dataPeriodos);
                // Helper.error_log('dataDescuentoVtas_FacturasAgrupadas', dataDescuentoVtas_FacturasAgrupadas);
                // Helper.error_log('dataDescuentoVtas_NCDetalladas', dataDescuentoVtas_NCDetalladas);
                // Helper.error_log('dataDescuentoVtas', dataDescuentoVtas);
                // Helper.error_log('dataReporte', dataReporte);

                // Enviar data a archivos HTML o Excel
                let titleDocument = 'Reporte Descuentos Sobre Ventas';
                let paramsFreemarker = Process.getParamsFreeMarker(params, dataPeriodos['currentYearContext'], dataPeriodos['lastYearContext']);
                this.addInput('name', titleDocument);
                this.addInput('anio', paramsFreemarker.anio);
                this.addInput('anio_', paramsFreemarker.anio_);
                this.addInput('json_meses', paramsFreemarker.json_meses)
                this.addInput('transactions', dataReporte)
            }
        }

        return DescuentosSobreVentas

    });
