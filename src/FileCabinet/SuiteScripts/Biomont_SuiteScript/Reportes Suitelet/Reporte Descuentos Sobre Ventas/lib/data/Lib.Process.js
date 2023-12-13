/**
 * @NApiVersion 2.1
 */
define(['./Lib.Basic', './Lib.Search', './Lib.Process', './Lib.Helper', 'N'],

    function (Basic, Search, Process, Helper, N) {

        function getDescuentoVtas(dataDescuentoVtas_FacturasAgrupadas, dataDescuentoVtas_NCDetalladas) {

            // Declarar variables
            let dataDescuentoVtas = dataDescuentoVtas_FacturasAgrupadas.concat(dataDescuentoVtas_NCDetalladas);

            // Procesar reporte
            // Formatear tipos de datos
            dataDescuentoVtas.forEach((ventas, key) => {
                dataDescuentoVtas[key]['importe_bruto_soles'] = parseFloat(ventas['importe_bruto_soles']);
                dataDescuentoVtas[key]['importe_neto_soles'] = parseFloat(ventas['importe_neto_soles']);
            });

            // Obtenemos descuento
            dataDescuentoVtas.forEach((ventas, key) => {

                let tipo_doc_id = Number(ventas['ns_tipo_documento']['id']);
                let tipo_doc_nombre = String(ventas['ns_tipo_documento']['nombre']).trim();
                let cuenta_contable_numero = String(ventas['cuenta_contable']['numero']);

                if ((tipo_doc_id == 8 || tipo_doc_nombre == 'Nota de credito') && (cuenta_contable_numero.substring(0, 2) == '74')) {
                    dataDescuentoVtas[key]['descuento'] = Math.abs(ventas['importe_bruto_soles']);
                    dataDescuentoVtas[key]['importe_bruto_soles'] = 0;
                } else {
                    dataDescuentoVtas[key]['descuento'] = parseFloat(ventas['importe_bruto_soles']) - parseFloat(ventas['importe_neto_soles']);
                }
            });

            return dataDescuentoVtas;
        }

        function getDescuentoVtasAgrupadoDetallado(dataDescuentoVtas) {

            // Declarar variables
            let dataDescuentoVtasFormateado = {};

            // Formateamos array
            dataDescuentoVtas.forEach((ventas, key) => {
                let anio = Number(ventas['anio']);
                let mes = Number(ventas['mes']);
                let numero_documento = String(ventas['numero_documento']).trim();

                let periodo_contable = Number(ventas['periodo_contable']);
                let periodo_contable_nombre = String(ventas['periodo_contable_nombre']).trim(); // Obtener el periodo contable "ene 2023"
                let periodo_contable_nombre_array = periodo_contable_nombre.split(" "); // Convertir periodo contable en array
                let percon_anio = periodo_contable_nombre_array[1]; // Obtener "2023"
                let percon_mes = periodo_contable_nombre_array[0]; // Obtener "ene"

                // totales por meses
                if (!dataDescuentoVtasFormateado['anio']) {
                    dataDescuentoVtasFormateado['anio'] = {};
                }
                if (!dataDescuentoVtasFormateado['anio'][percon_anio]) {
                    dataDescuentoVtasFormateado['anio'][percon_anio] = {};
                }
                if (!dataDescuentoVtasFormateado['anio'][percon_anio]['mes']) {
                    dataDescuentoVtasFormateado['anio'][percon_anio]['mes'] = {};
                }
                if (!dataDescuentoVtasFormateado['anio'][percon_anio]['mes'][percon_mes]) {
                    dataDescuentoVtasFormateado['anio'][percon_anio]['mes'][percon_mes] = { 'totales': {} };
                }
                if (!dataDescuentoVtasFormateado['anio'][percon_anio]['mes'][percon_mes]['totales']['importe_bruto_soles']) {
                    dataDescuentoVtasFormateado['anio'][percon_anio]['mes'][percon_mes]['totales']['importe_bruto_soles'] = 0;
                }
                if (!dataDescuentoVtasFormateado['anio'][percon_anio]['mes'][percon_mes]['totales']['descuento']) {
                    dataDescuentoVtasFormateado['anio'][percon_anio]['mes'][percon_mes]['totales']['descuento'] = 0;
                }
                if (!dataDescuentoVtasFormateado['anio'][percon_anio]['mes'][percon_mes]['totales']['importe_neto_soles']) {
                    dataDescuentoVtasFormateado['anio'][percon_anio]['mes'][percon_mes]['totales']['importe_neto_soles'] = 0;
                }

                dataDescuentoVtasFormateado['anio'][percon_anio]['mes'][percon_mes]['totales']['importe_bruto_soles'] += parseFloat(ventas['importe_bruto_soles']);
                dataDescuentoVtasFormateado['anio'][percon_anio]['mes'][percon_mes]['totales']['descuento'] += parseFloat(ventas['descuento']);
                dataDescuentoVtasFormateado['anio'][percon_anio]['mes'][percon_mes]['totales']['importe_neto_soles'] += parseFloat(ventas['importe_neto_soles']);
                dataDescuentoVtasFormateado['anio'][percon_anio]['mes'][percon_mes]['totales']['periodo_contable'] = periodo_contable;

                // detalle por meses
                if (!dataDescuentoVtasFormateado['anio'][percon_anio]['mes'][percon_mes]['detalle']) {
                    dataDescuentoVtasFormateado['anio'][percon_anio]['mes'][percon_mes]['detalle'] = [];
                }
                dataDescuentoVtasFormateado['anio'][percon_anio]['mes'][percon_mes]['detalle'].push(ventas);

                // totales por año
                if (!dataDescuentoVtasFormateado['anio'][percon_anio]['totales']) {
                    dataDescuentoVtasFormateado['anio'][percon_anio]['totales'] = {};
                }
                if (!dataDescuentoVtasFormateado['anio'][percon_anio]['totales']['importe_bruto_soles']) {
                    dataDescuentoVtasFormateado['anio'][percon_anio]['totales']['importe_bruto_soles'] = 0;
                }
                if (!dataDescuentoVtasFormateado['anio'][percon_anio]['totales']['descuento']) {
                    dataDescuentoVtasFormateado['anio'][percon_anio]['totales']['descuento'] = 0;
                }
                if (!dataDescuentoVtasFormateado['anio'][percon_anio]['totales']['importe_neto_soles']) {
                    dataDescuentoVtasFormateado['anio'][percon_anio]['totales']['importe_neto_soles'] = 0;
                }

                dataDescuentoVtasFormateado['anio'][percon_anio]['totales']['importe_bruto_soles'] += parseFloat(ventas['importe_bruto_soles']);
                dataDescuentoVtasFormateado['anio'][percon_anio]['totales']['descuento'] += parseFloat(ventas['descuento']);
                dataDescuentoVtasFormateado['anio'][percon_anio]['totales']['importe_neto_soles'] += parseFloat(ventas['importe_neto_soles']);
            });

            // Retornos array de descuentos sobre ventas
            let response = {
                "dataDescuentoVtas": dataDescuentoVtasFormateado
            };

            return response;
        }

        function getDescuentoVtasDetallado(dataDescuentoVtas) {

            // Declarar variables
            let dataDescuentoVtasFormateado = {};

            // Formateamos array
            dataDescuentoVtas.forEach((ventas, key) => {
                // totales
                if (!dataDescuentoVtasFormateado['totales']) {
                    dataDescuentoVtasFormateado['totales'] = {};
                }
                if (!dataDescuentoVtasFormateado['totales']['importe_bruto_soles']) {
                    dataDescuentoVtasFormateado['totales']['importe_bruto_soles'] = 0;
                }
                if (!dataDescuentoVtasFormateado['totales']['descuento']) {
                    dataDescuentoVtasFormateado['totales']['descuento'] = 0;
                }
                if (!dataDescuentoVtasFormateado['totales']['importe_neto_soles']) {
                    dataDescuentoVtasFormateado['totales']['importe_neto_soles'] = 0;
                }

                dataDescuentoVtasFormateado['totales']['importe_bruto_soles'] += parseFloat(ventas['importe_bruto_soles']);
                dataDescuentoVtasFormateado['totales']['descuento'] += parseFloat(ventas['descuento']);
                dataDescuentoVtasFormateado['totales']['importe_neto_soles'] += parseFloat(ventas['importe_neto_soles']);

                // detalle
                if (!dataDescuentoVtasFormateado['detalle']) {
                    dataDescuentoVtasFormateado['detalle'] = [];
                }
                dataDescuentoVtasFormateado['detalle'].push(ventas);
            });

            // Retornos array de descuentos sobre ventas
            let response = {
                "dataDescuentoVtas": dataDescuentoVtasFormateado
            };

            return response;
        }

        function getParamsFreeMarker(params, currentYear, lastYear) {

            // Obtener año actual y año pasado
            let anio = currentYear.text;
            let anio_ = lastYear.text;

            // Convertir "FY 2023" en "2023"
            anio = anio.substring(anio.length - 4);
            anio_ = anio_.substring(anio_.length - 4);

            // Obtener json con la descripcion de los meses del año
            let json_meses = {
                "ene": "ENERO",
                "feb": "FEBRERO",
                "mar": "MARZO",
                "abr": "ABRIL",
                "may": "MAYO",
                "jun": "JUNIO",
                "jul": "JULIO",
                "ago": "AGOSTO",
                "sep": "SEPTIEMBRE",
                "oct": "OCTUBRE",
                "nov": "NOVIEMBRE",
                "dic": "DICIEMBRE"
            };

            return { anio, anio_, json_meses }
        }

        function getReporteFreeMarker(dataReporte) {

            // Convertir valores nulos en un objeto JavaScript a string - Al parecer FreeMarker no acepta valores nulos
            // dataReporte = Helper.convertObjectValuesToStrings(dataReporte);

            return dataReporte;
        }

        return { getDescuentoVtas, getDescuentoVtasAgrupadoDetallado, getDescuentoVtasDetallado, getParamsFreeMarker, getReporteFreeMarker }

    });
