/**
 * @NApiVersion 2.1
 */
define(['./Lib.Basic', './Lib.Helper', 'N'],

    function (Basic, Helper, N) {

        const { search, format } = N;

        /******************/

        function createAccountingPeriodYear() {

            let result = [];
            let currentDate = format.format({ type: format.Type.DATE, value: new Date() });

            search.create({
                type: 'accountingperiod',
                filters:
                    [
                        ["isyear", "is", "T"],
                        'AND',
                        ['startdate', 'onorbefore', currentDate]
                    ],
                columns: [
                    { name: 'startdate', sort: 'DESC', label: 'start' },
                    { name: 'internalid', label: 'id' },
                    { name: "periodname", label: "Name" }
                ]
            }).run().each(node => {
                let { columns } = node;
                result.push({
                    id: node.getValue(columns[1]),
                    text: node.getValue(columns[2])
                });
                return true;
            });
            return result;
        }

        function createAccountingPeriodByYear(year) {

            let result = [];

            search.create({
                type: 'accountingperiod',
                filters:
                    [
                        ["parent", "anyof", year],
                        "AND",
                        ["isquarter", "is", "F"],
                        "AND",
                        ["isyear", "is", "F"],
                        'AND',
                        ["isadjust", "is", "F"]
                    ],
                columns: [
                    { name: 'startdate', sort: 'DESC', label: 'start' },
                    { name: 'internalid', label: 'id' },
                    { name: "periodname", label: "Name" }
                ]
            }).run().each(node => {
                let { columns } = node;
                result.push({
                    id: node.getValue(columns[1]),
                    text: node.getValue(columns[2])
                });
                return true;
            });
            return result;
        }

        /******************/

        function getPeriodos(subsidiary, view, year, month) {

            // Declarar variables
            let currentPositionYear = -1;
            let currentYearContext = null;
            let currentYear = year;
            let lastYearContext = null;
            let lastYear = null;

            // Obtener periodos contables (Todos los años de forma descendente: 2023, 2022, 2021)
            let yearList = createAccountingPeriodYear();

            // Obtener periodo contable del año actual
            for (var i = 0; i < yearList.length; i++) {
                let lineYear = yearList[i].id;
                if (currentYear == lineYear) {
                    currentYearContext = yearList[i];
                    currentPositionYear = i;
                    break;
                }
            }

            // Obtener periodo contable del año pasado
            lastYearContext = yearList[currentPositionYear + 1];
            lastYear = yearList[currentPositionYear + 1].id;

            // Debug
            // Helper.error_log('debug', { yearList, currentYearContext, currentYear, lastYearContext, lastYear });

            // Declarar variables
            let currentPeriods = [];
            let lastPeriods = [];
            let periodsList = [];

            // Obtener peridos contables (Todos los meses de año actual y año pasado)
            let auxCurrentPeriods = createAccountingPeriodByYear(currentYear).reverse();
            let auxLastPeriods = createAccountingPeriodByYear(lastYear).reverse();
            let currentMonth = month;

            if (view == Basic.DATA.View.DETAILED) {
                // Cortar los meses de la matriz, primero busque la posición de un mes
                for (var i = 0; i < auxCurrentPeriods.length; i++) {
                    currentPeriods.push(auxCurrentPeriods[i]);
                    lastPeriods.push(auxLastPeriods[i]);

                    if (auxCurrentPeriods[i].id == currentMonth) {
                        break;
                    }
                }
            } else if (view == Basic.DATA.View.MONTHLY) {
                // Obtener mes en la matriz
                for (var i = 0; i < auxCurrentPeriods.length; i++) {
                    if (auxCurrentPeriods[i].id == currentMonth) {
                        currentPeriods.push(auxCurrentPeriods[i]);
                        lastPeriods.push(auxLastPeriods[i]);
                    }
                }
            } else { // ANNUAL
                // Obtener todos los meses en la matriz
                for (var i = 0; i < auxCurrentPeriods.length; i++) {
                    currentPeriods.push(auxCurrentPeriods[i]);
                    lastPeriods.push(auxLastPeriods[i]);
                }
            }

            // Obtener periodsList
            for (var i = 0; i < currentPeriods.length; i++) {
                periodsList.push({
                    current: currentPeriods[i],
                    last: lastPeriods[i],
                });
            }

            // Obtener ids de periodos
            let currentPeriodsId = periodsList.map(element => { return element.current.id });
            let lastPeriodsId = periodsList.map(element => { return element.last.id });
            let periodsId = currentPeriodsId.concat(lastPeriodsId);

            // Debug
            // Helper.error_log('debug', { currentPeriods, lastPeriods, periodsList, periodsId });

            return { currentYearContext, lastYearContext, periodsId };
        }

        function getDescuentoVtas_Facturas(subsidiary, periods) {

            // Declarar variables
            let resultTransaction = [];

            // Filtro de subsidiary
            let array_where_subsidiary = ["subsidiary", "anyof", "@NONE@"];
            if (subsidiary != '') {
                array_where_subsidiary = ["subsidiary", "anyof", subsidiary];
            }

            // Filtro de periodo
            let array_where_date = ["accountingperiod.internalid", "anyof", "@NONE@"];
            if (Array.isArray(periods) && periods[0] != '') {
                array_where_date = ["accountingperiod.internalid", "anyof"].concat(periods);
            }

            // Declarar search
            // Agregar tipo
            let transactionQuery = new Basic.CustomSearch('transaction');

            // Agregar columnas
            transactionQuery.pushColumn({
                name: "internalid",
                summary: "GROUP",
                label: "ID interno"
            });
            transactionQuery.pushColumn({
                name: "trandate",
                summary: "GROUP",
                // sort: search.Sort.ASC,
                label: "Fecha"
            });
            transactionQuery.pushColumn({
                name: "formulatext",
                summary: "MAX",
                formula: "TO_CHAR({trandate}, 'yyyymm')",
                sort: search.Sort.ASC,
                label: "Anio Mes"
            });
            transactionQuery.pushColumn({
                name: "formulatext",
                summary: "MAX",
                formula: "TO_CHAR({trandate}, 'yyyy')",
                label: "Anio"
            });
            transactionQuery.pushColumn({
                name: "formulatext",
                summary: "MAX",
                formula: "TO_CHAR({trandate}, 'mm')",
                label: "Mes"
            });
            transactionQuery.pushColumn({
                name: "formulatext",
                summary: "MAX",
                formula: "TO_CHAR({trandate}, 'MONTH')",
                label: "Mes Descripcion"
            });
            transactionQuery.pushColumn({
                name: "altname",
                join: "customer",
                summary: "MAX",
                label: "Nombre Cliente"
            });
            transactionQuery.pushColumn({
                name: "internalid",
                join: "CUSTBODY_NS_DOCUMENT_TYPE",
                summary: "MAX",
                label: "Tipo Documento : ID interno"
            });
            transactionQuery.pushColumn({
                name: "name",
                join: "CUSTBODY_NS_DOCUMENT_TYPE",
                summary: "MAX",
                label: "Tipo Documento : Nombre"
            });
            transactionQuery.pushColumn({
                name: "tranid",
                summary: "GROUP",
                sort: search.Sort.ASC,
                label: "Número de documento"
            });
            transactionQuery.pushColumn({
                name: "formulatext",
                summary: "MAX",
                formula: "'-'",
                label: "Codigo"
            });
            transactionQuery.pushColumn({
                name: "grossamount",
                summary: "SUM",
                label: "Importe Bruto Soles"
            });
            transactionQuery.pushColumn({
                name: "netamount",
                summary: "SUM",
                label: "Importe Neto Soles"
            });
            transactionQuery.pushColumn({
                name: "internalid",
                join: "accountingPeriod",
                summary: "MAX",
                label: "Periodo Contable : ID interno"
            });
            transactionQuery.pushColumn({
                name: "periodname",
                join: "accountingPeriod",
                summary: "MAX",
                label: "Periodo Contable : Nombre"
            });

            // Agregar filtros
            transactionQuery.updateFilters([
                ["mainline", "any", ""],
                "AND",
                ["type", "anyof", "CustInvc"],
                "AND",
                ["voided", "is", "F"],
                "AND",
                array_where_date,
                "AND",
                [
                    [["item.custitem3", "anyof", "1", "3", "2", "9", "11", "10"], "OR",
                    [["item.custitem3", "anyof", "38"], "AND", ["item", "anyof", "8885", "8890", "8895", "8935", "17242"]]]
                ],
                "AND",
                ["item", "noneof", "12727", "4511"],
                "AND",
                ["custbody114", "noneof", "13", "22"],
                "AND",
                ["custcol_ns_afec_igv", "noneof", "16"],
                "AND",
                array_where_subsidiary
            ]);

            // Cantidad de registros en search
            // transactionQuery.addSetting('count', true);

            // Buscar por indice o label en busqueda
            transactionQuery.addSetting('type', 'indice');

            // Crear y recorrer search
            transactionQuery.execute(node => {

                let id_interno = node.getValue(0);
                let fecha = node.getValue(1);
                let anio_mes = node.getValue(2);
                let anio = node.getValue(3);
                let mes = node.getValue(4);
                let mes_nombre = node.getValue(5);
                let cliente = node.getValue(6);
                let ns_tipo_documento = node.getValue(7);
                let ns_tipo_documento_nombre = node.getValue(8);
                let numero_documento = node.getValue(9);
                let articulo = '-';
                let articulo_codigo = '-';
                let importe_bruto_soles = node.getValue(11);
                let importe_neto_soles = node.getValue(12);
                let periodo_contable = node.getValue(13);
                let periodo_contable_nombre = node.getValue(14);

                resultTransaction.push({
                    id_interno: id_interno,
                    fecha: fecha,
                    anio_mes: anio_mes,
                    anio: anio,
                    mes: mes,
                    mes_nombre: mes_nombre,
                    cliente: cliente,
                    ns_tipo_documento: { id: ns_tipo_documento, nombre: ns_tipo_documento_nombre },
                    numero_documento: numero_documento,
                    articulo: { id: articulo, codigo: articulo_codigo },
                    importe_bruto_soles: importe_bruto_soles,
                    importe_neto_soles: importe_neto_soles,
                    periodo_contable: periodo_contable,
                    periodo_contable_nombre: periodo_contable_nombre,
                });
            });

            // Helper.error_log('getDescuentoVtas_Facturas', resultTransaction);
            return resultTransaction;
        }

        function getDescuentoVtas_NC(subsidiary, periods) {

            // Declarar variables
            let resultTransaction = [];

            // Filtro de subsidiary
            let array_where_subsidiary = ["subsidiary", "anyof", "@NONE@"];
            if (subsidiary != '') {
                array_where_subsidiary = ["subsidiary", "anyof", subsidiary];
            }

            // Filtro de periodo
            let array_where_date = ["accountingperiod.internalid", "anyof", "@NONE@"];
            if (Array.isArray(periods) && periods[0] != '') {
                array_where_date = ["accountingperiod.internalid", "anyof"].concat(periods);
            }

            // Declarar search
            // Agregar tipo
            let transactionQuery = new Basic.CustomSearch('transaction');

            // Agregar columnas
            transactionQuery.pushColumn({ name: "internalid", label: "ID interno" });
            transactionQuery.pushColumn({
                name: "trandate",
                // sort: search.Sort.ASC,
                label: "Fecha"
            });
            transactionQuery.pushColumn({
                name: "formulatext",
                formula: "TO_CHAR({trandate}, 'yyyymm')",
                sort: search.Sort.ASC,
                label: "Anio Mes"
            });
            transactionQuery.pushColumn({
                name: "formulatext",
                formula: "TO_CHAR({trandate}, 'yyyy')",
                label: "Anio"
            });
            transactionQuery.pushColumn({
                name: "formulatext",
                formula: "TO_CHAR({trandate}, 'mm')",
                label: "Mes"
            });
            transactionQuery.pushColumn({
                name: "formulatext",
                formula: "TO_CHAR({trandate}, 'MONTH')",
                label: "Mes Descripcion"
            });
            transactionQuery.pushColumn({
                name: "altname",
                join: "customer",
                label: "Nombre Cliente"
            });
            transactionQuery.pushColumn({
                name: "internalid",
                join: "CUSTBODY_NS_DOCUMENT_TYPE",
                label: "Tipo Documento : ID interno"
            });
            transactionQuery.pushColumn({
                name: "name",
                join: "CUSTBODY_NS_DOCUMENT_TYPE",
                label: "Tipo Documento : Nombre"
            });
            transactionQuery.pushColumn({
                name: "tranid",
                sort: search.Sort.ASC,
                label: "Número de documento"
            });
            transactionQuery.pushColumn({ name: "item", label: "Codigo" });
            transactionQuery.pushColumn({ name: "grossamount", label: "Importe Bruto Soles" });
            transactionQuery.pushColumn({ name: "netamount", label: "Importe Neto Soles" });
            transactionQuery.pushColumn({
                name: "internalid",
                join: "accountingPeriod",
                label: "Periodo Contable : ID interno"
             });
            transactionQuery.pushColumn({
                name: "periodname",
                join: "accountingPeriod",
                label: "Periodo Contable : Nombre"
            });

            // Agregar filtros
            transactionQuery.updateFilters([
                ["mainline", "any", ""],
                "AND",
                ["type", "anyof", "CustCred"],
                "AND",
                ["voided", "is", "F"],
                "AND",
                array_where_date,
                "AND",
                [
                    [["item.custitem3", "anyof", "1", "3", "2", "9", "11", "10"], "OR",
                    [["item.custitem3", "anyof", "38"], "AND", ["item", "anyof", "8885", "8890", "8895", "8935", "17242"]]]
                ],
                "AND",
                ["item", "noneof", "12727", "4511"],
                "AND",
                ["custbody114", "noneof", "13", "22"],
                "AND",
                ["custcol_ns_afec_igv", "noneof", "16"],
                "AND",
                array_where_subsidiary
            ]);

            // Cantidad de registros en search
            // transactionQuery.addSetting('count', true);

            // Buscar por indice o label en busqueda
            transactionQuery.addSetting('type', 'indice');

            // Crear y recorrer search
            transactionQuery.execute(node => {

                let id_interno = node.getValue(0);
                let fecha = node.getValue(1);
                let anio_mes = node.getValue(2);
                let anio = node.getValue(3);
                let mes = node.getValue(4);
                let mes_nombre = node.getValue(5);
                let cliente = node.getValue(6);
                let ns_tipo_documento = node.getValue(7);
                let ns_tipo_documento_nombre = node.getValue(8);
                let numero_documento = node.getValue(9);
                let articulo = node.getValue(10);
                let articulo_codigo = node.getText(10);
                let importe_bruto_soles = node.getValue(11);
                let importe_neto_soles = node.getValue(12);
                let periodo_contable = node.getValue(13);
                let periodo_contable_nombre = node.getValue(14);

                resultTransaction.push({
                    id_interno: id_interno,
                    fecha: fecha,
                    anio_mes: anio_mes,
                    anio: anio,
                    mes: mes,
                    mes_nombre: mes_nombre,
                    cliente: cliente,
                    ns_tipo_documento: { id: ns_tipo_documento, nombre: ns_tipo_documento_nombre },
                    numero_documento: numero_documento,
                    articulo: { id: articulo, codigo: articulo_codigo },
                    importe_bruto_soles: importe_bruto_soles,
                    importe_neto_soles: importe_neto_soles,
                    periodo_contable: periodo_contable,
                    periodo_contable_nombre: periodo_contable_nombre,
                });
            });

            // Helper.error_log('getDescuentoVtas_NC', resultTransaction);
            return resultTransaction;
        }

        return { createAccountingPeriodYear, createAccountingPeriodByYear, getPeriodos, getDescuentoVtas_Facturas, getDescuentoVtas_NC }

    });
