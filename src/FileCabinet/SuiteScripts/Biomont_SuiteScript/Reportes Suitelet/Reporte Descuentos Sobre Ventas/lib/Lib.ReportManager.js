/**
 * @NApiVersion 2.1
 */
define([
    './reports/Class.DescuentosSobreVentas',
    './reports/Class.DetalleDescuentosSobreVentas'
],

    function (
        DescuentosSobreVentas,
        DetalleDescuentosSobreVentas
    ) {

        return {
            DescuentosSobreVentas,
            DetalleDescuentosSobreVentas
        }

    });
