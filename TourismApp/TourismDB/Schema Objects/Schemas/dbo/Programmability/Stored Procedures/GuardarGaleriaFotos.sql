CREATE PROCEDURE dbo.[GuardarGaleriaFotos] (@jsonFotos NVARCHAR(MAX),@Usuario VARCHAR(100))
AS 
BEGIN
	SELECT IdSitioTuristico,IdGaleriaFoto,UrlFoto
	INTO #TempGaleriaFotos
    FROM OPENJSON( @jsonFotos ) 
    WITH (IdSitioTuristico INT '$.IdSitioTuristico',IdGaleriaFoto INT '$.IdGaleriaFoto', UrlFoto NVARCHAR(1000) '$.UrlFoto');

	MERGE tblGaleriaFotos AS tgt  
    USING (SELECT IdGaleriaFoto,IdSitioTuristico, UrlFoto
	FROM #TempGaleriaFotos) AS src 
    ON (tgt.IdGaleriaFotosST = src.IdGaleriaFoto)  
    WHEN NOT MATCHED THEN  
        INSERT (
			IdSitioTuristico,
			UrlFoto)  
        VALUES (
			src.IdSitioTuristico,
			src.UrlFoto);

	DROP TABLE IF EXISTS #TempGaleriaFotos;
END