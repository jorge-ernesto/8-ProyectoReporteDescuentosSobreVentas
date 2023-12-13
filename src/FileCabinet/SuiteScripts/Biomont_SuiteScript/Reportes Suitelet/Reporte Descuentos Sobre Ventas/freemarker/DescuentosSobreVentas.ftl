<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
    xmlns:html="http://www.w3.org/TR/REC-html40">
    <ss:Styles>
        <ss:Style ss:ID="header">
            <ss:Alignment ss:Horizontal="Left" />
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
        </ss:Style>
        <ss:Style ss:ID="header-red">
            <ss:Alignment ss:Horizontal="Left" />
            <ss:Font ss:Bold="1" ss:Color="#ff0000" />
        </ss:Style>
        <ss:Style ss:ID="t1">
            <#--  <ss:Alignment ss:Horizontal="Left" />  -->
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <ss:Interior ss:Color="#E0E6EF" ss:Pattern="Solid" />
            <NumberFormat ss:Format="0.00" />
        </ss:Style>
        <ss:Style ss:ID="t1-percent">
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <ss:Interior ss:Color="#E0E6EF" ss:Pattern="Solid" />
            <NumberFormat ss:Format="0%" />
        </ss:Style>
        <ss:Style ss:ID="t1-number">
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <ss:Interior ss:Color="#E0E6EF" ss:Pattern="Solid" />
        </ss:Style>
        <ss:Style ss:ID="t1-currency">
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <ss:Interior ss:Color="#E0E6EF" ss:Pattern="Solid" />
            <NumberFormat ss:Format="Currency" />
        </ss:Style>
        <ss:Style ss:ID="t1-currency-0decimals">
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <ss:Interior ss:Color="#E0E6EF" ss:Pattern="Solid" />
            <NumberFormat ss:Format="S/ #,##0" /> <!-- Alternativa a "Currency" para eliminar decimales -->
        </ss:Style>
        <ss:Style ss:ID="background">
            <Alignment ss:Horizontal="Right" ss:Vertical="Bottom" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FFFFFF" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FFFFFF" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FFFFFF" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FFFFFF" />
            </Borders>
        </ss:Style>
        <ss:Style ss:ID="cell">
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <NumberFormat ss:Format="0.00" />
        </ss:Style>
        <ss:Style ss:ID="cell-percent">
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <NumberFormat ss:Format="0%" />
        </ss:Style>
        <ss:Style ss:ID="cell-currency">
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <NumberFormat ss:Format="Currency" />
        </ss:Style>
        <ss:Style ss:ID="cell-currency-0decimals">
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <NumberFormat ss:Format="S/ #,##0" /> <!-- Alternativa a "Currency" para eliminar decimales -->
        </ss:Style>
    </ss:Styles>
    <Worksheet ss:Name="Reporte Comparativo">
        <Table ss:StyleID="background">

            <!-- Tamaño de columnas -->
            <Column ss:Width="200" />
            <Column ss:Width="20" />
            <Column ss:Width="90" />
            <Column ss:Width="90" />
            <Column ss:Width="90" />
            <Column ss:Width="90" />
            <Column ss:Width="20" />
            <Column ss:Width="90" />
            <Column ss:Width="90" />
            <Column ss:Width="90" />
            <Column ss:Width="90" />
            <Row>
            </Row>

            <!-- Inicio de presentacion -->
            <Row>
                <Cell ss:StyleID="header-red">
                    <Data ss:Type="String">LABORATORIOS BIOMONT S.A.</Data>
                </Cell>
            </Row>
            <Row>
                <Cell ss:StyleID="header">
                    <Data ss:Type="String">Presentacion :</Data>
                </Cell>
                <Cell ss:StyleID="cell" ss:MergeAcross="2">
                    <Data ss:Type="String">${context.name}</Data>
                </Cell>
            </Row>
            <!--
            <Row>
                <Cell ss:StyleID="header">
                    <Data ss:Type="String">Año :</Data>
                </Cell>
                <Cell ss:StyleID="cell" ss:MergeAcross="2">
                    <Data ss:Type="String">${context.year}</Data>
                </Cell>
            </Row>
            <Row>
                <Cell ss:StyleID="header">
                    <Data ss:Type="String">Mes :</Data>
                </Cell>
                <Cell ss:StyleID="cell" ss:MergeAcross="2">
                    <Data ss:Type="String">${context.month}</Data>
                </Cell>
            </Row>
            -->
            <Row>
            </Row>

            <!-- Inicio de cabecera (tabla) -->
            <Row>
                <!-- Mes -->
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String"></Data>
                </Cell>
                <Cell>
                </Cell>

                <!-- Año seleccionado -->
                <Cell ss:StyleID="t1" ss:MergeAcross="3">
                    <Data ss:Type="String">${context.anio}</Data>
                </Cell>
                <Cell>
                </Cell>

                <!-- Año anterior -->
                <Cell ss:StyleID="t1" ss:MergeAcross="3">
                    <Data ss:Type="String">${context.anio_}</Data>
                </Cell>
            </Row>

            <Row>
                <!-- Mes -->
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">MES</Data>
                </Cell>
                <Cell>
                </Cell>

                <!-- Año seleccionado -->
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">VENTA</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">DSCTO</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">V. NETA</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">% Dscto</Data>
                </Cell>
                <Cell>
                </Cell>

                <!-- Año anterior -->
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">VENTA</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">DSCTO</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">V. NETA</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">% Dscto</Data>
                </Cell>
            </Row>

            <!-- Inicio de cuerpo (tabla) -->
            <#list context.transactions.dataDescuentoVtas.anio[context.anio].mes as keymeses, meses>
                <#list meses as keyventas, ventas>
                    <#if keyventas == 'totales'>
                        <#assign importe_bruto_soles = ventas.importe_bruto_soles!0>
                        <#assign descuento = ventas.descuento!0>
                        <#assign importe_neto_soles = ventas.importe_neto_soles!0>

                        <#if (importe_bruto_soles == 0)>
                            <#assign porcentaje = 0>
                        <#else>
                            <#--  <#assign porcentaje = (descuento * 100) / importe_bruto_soles>  -->
                            <#assign porcentaje = descuento / importe_bruto_soles>
                        </#if>

                        <#assign importe_bruto_soles_ = context.transactions.dataDescuentoVtas.anio[context.anio_].mes[keymeses].totales.importe_bruto_soles!0>
                        <#assign descuento_ = context.transactions.dataDescuentoVtas.anio[context.anio_].mes[keymeses].totales.descuento!0>
                        <#assign importe_neto_soles_ = context.transactions.dataDescuentoVtas.anio[context.anio_].mes[keymeses].totales.importe_neto_soles!0>

                        <#if (importe_bruto_soles_ == 0)>
                            <#assign porcentaje_ = 0>
                        <#else>
                            <#--  <#assign porcentaje_ = (descuento_ * 100) / importe_bruto_soles_>  -->
                            <#assign porcentaje_ = descuento_ / importe_bruto_soles_>
                        </#if>

                        <Row>
                            <!-- Mes-->
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String">${context.json_meses[keymeses]}</Data>
                            </Cell>
                            <Cell>
                            </Cell>

                            <!-- Año seleccionado -->
                            <Cell ss:StyleID="cell-currency-0decimals">
                                <Data ss:Type="Number">${importe_bruto_soles}</Data>
                            </Cell>
                            <Cell ss:StyleID="cell-currency-0decimals">
                                <Data ss:Type="Number">${descuento}</Data>
                            </Cell>
                            <Cell ss:StyleID="cell-currency-0decimals">
                                <Data ss:Type="Number">${importe_neto_soles}</Data>
                            </Cell>
                            <Cell ss:StyleID="cell-percent">
                                <Data ss:Type="Number">${porcentaje}</Data>
                            </Cell>
                            <Cell>
                            </Cell>

                            <!-- Año anterior -->
                            <Cell ss:StyleID="cell-currency-0decimals">
                                <Data ss:Type="Number"><#if importe_bruto_soles_?exists>${importe_bruto_soles_}<#else>0</#if></Data>
                            </Cell>
                            <Cell ss:StyleID="cell-currency-0decimals">
                                <Data ss:Type="Number"><#if descuento_?exists>${descuento_}<#else>0</#if></Data>
                            </Cell>
                            <Cell ss:StyleID="cell-currency-0decimals">
                                <Data ss:Type="Number"><#if importe_neto_soles_?exists>${importe_neto_soles_}<#else>0</#if></Data>
                            </Cell>
                            <Cell ss:StyleID="cell-percent">
                                <Data ss:Type="Number"><#if porcentaje_?exists>${porcentaje_}<#else>0</#if></Data>
                            </Cell>
                        </Row>
                    </#if>
                </#list>
            </#list>

            <!-- Inicio pie (tabla) -->
            <#assign totales = context.transactions.dataDescuentoVtas.anio[context.anio].totales>
            <#assign totales_ = context.transactions.dataDescuentoVtas.anio[context.anio_].totales>

            <#if (totales.importe_bruto_soles == 0)>
                <#assign porcentaje_total = 0>
            <#else>
                <#--  <#assign porcentaje_total = (totales.descuento * 100) / totales.importe_bruto_soles>  -->
                <#assign porcentaje_total = totales.descuento / totales.importe_bruto_soles>
            </#if>

            <#if (totales_.importe_bruto_soles == 0)>
                <#assign porcentaje_total_ = 0>
            <#else>
                <#--  <#assign porcentaje_total_ = (totales_.descuento * 100) / totales_.importe_bruto_soles>  -->
                <#assign porcentaje_total_ = totales_.descuento / totales_.importe_bruto_soles>
            </#if>

            <Row>
                <!-- Mes-->
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Totales</Data>
                </Cell>
                <Cell>
                </Cell>

                <!-- Año seleccionado -->
                <Cell ss:StyleID="t1-currency-0decimals">
                    <Data ss:Type="Number">${totales.importe_bruto_soles}</Data>
                </Cell>
                <Cell ss:StyleID="t1-currency-0decimals">
                    <Data ss:Type="Number">${totales.descuento}</Data>
                </Cell>
                <Cell ss:StyleID="t1-currency-0decimals">
                    <Data ss:Type="Number">${totales.importe_neto_soles}</Data>
                </Cell>
                <Cell ss:StyleID="t1-percent">
                    <Data ss:Type="Number">${porcentaje_total}</Data>
                </Cell>
                <Cell>
                </Cell>

                <!-- Año anterior -->
                <Cell ss:StyleID="t1-currency-0decimals">
                    <Data ss:Type="Number">${totales_.importe_bruto_soles}</Data>
                </Cell>
                <Cell ss:StyleID="t1-currency-0decimals">
                    <Data ss:Type="Number">${totales_.descuento}</Data>
                </Cell>
                <Cell ss:StyleID="t1-currency-0decimals">
                    <Data ss:Type="Number">${totales_.importe_neto_soles}</Data>
                </Cell>
                <Cell ss:StyleID="t1-percent">
                    <Data ss:Type="Number">${porcentaje_total_}</Data>
                </Cell>
            </Row>
            <Row>
            </Row>

        </Table>
    </Worksheet>
</Workbook>