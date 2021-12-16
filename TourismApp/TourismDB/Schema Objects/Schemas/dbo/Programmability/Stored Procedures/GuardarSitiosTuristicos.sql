CREATE PROCEDURE dbo.[GuardarSitiosTuristicos] (@jsonSitioTuristico NVARCHAR(MAX),@CodigoTipoSitio VARCHAR(20),@Usuario VARCHAR(100),@IdSitioTuristico INT = NULL)
AS 
BEGIN
	DECLARE @IdTipoSitioTuristico INT = (SELECT TOP 1 IdTipoSitioTuristico FROM tblTipoSitioTuristico WHERE Codigo  = @CodigoTipoSitio)
	CREATE TABLE #Action ([Accion] VARCHAR(20))

	SELECT IdSitioTuristico,NombreSitioTuristicoESP, NombreSitioTuristicoENG, IdMunicipio, Latitud, Longitud,IconoMarcador, Activo, DescripcionESP, DescripcionENG, PresentacionESP, PresentacionENG, RutaESP, RutaENG, DireccionESP, DireccionENG, Horario
	INTO #TempSitioTuristico 
	FROM OPENJSON(@jsonSitioTuristico)
	  WITH (
		IdSitioTuristico INT 'strict $.IdSitioTuristico',
		NombreSitioTuristicoESP VARCHAR(MAX)  'strict $.NombreSitioTuristicoESP',
		NombreSitioTuristicoENG VARCHAR(MAX) 'strict $.NombreSitioTuristicoENG',
		IdMunicipio INT 'strict $.IdMunicipio',
		Latitud DECIMAL(12, 9) 'strict $.Latitud',
		Longitud  DECIMAL(12, 9) 'strict $.Longitud',
		IconoMarcador VARCHAR(500) 'strict $.IconoMarcador',
		Activo BIT 'strict $.Activo',
		DescripcionESP VARCHAR(MAX) 'strict $.DescripcionESP',
		DescripcionENG VARCHAR(MAX) 'strict $.DescripcionENG',
		PresentacionESP VARCHAR(MAX) 'strict $.PresentacionESP',
		PresentacionENG VARCHAR(MAX) 'strict $.PresentacionENG',
		RutaESP VARCHAR(MAX) 'strict $.RutaESP',
		RutaENG VARCHAR(MAX) 'strict $.RutaENG',
		DireccionESP VARCHAR(MAX) 'strict $.DireccionESP',
		DireccionENG VARCHAR(MAX) 'strict $.DireccionENG',
		Horario VARCHAR(MAX)  'strict $.Horario'
		);

    MERGE tblSitioTuristico AS tgt  
    USING (SELECT IdSitioTuristico,NombreSitioTuristicoESP,NombreSitioTuristicoENG,IdMunicipio, Latitud,Longitud, NULL AS Altitud, IconoMarcador, Activo, DescripcionESP, DescripcionENG, PresentacionESP, PresentacionENG,RutaESP, RutaENG, DireccionESP, DireccionENG, Horario
	FROM #TempSitioTuristico) AS src 
    ON (tgt.IdSitioTuristico = src.IdSitioTuristico)  
    WHEN MATCHED THEN
        UPDATE SET 
			NombreSitioTuristicoESP= src.NombreSitioTuristicoESP,
			NombreSitioTuristicoENG= src.NombreSitioTuristicoENG,
			IdMunicipio= src.IdMunicipio,
			Latitud= src.Latitud,
			Longitud= src.Longitud,
			IconoMarcador= src.IconoMarcador,
			Activo= src.Activo,
			DescripcionESP= src.DescripcionESP,
			DescripcionENG= src.DescripcionENG,
			PresentacionESP= src.PresentacionESP,
			PresentacionENG= src.PresentacionENG,
			RutaESP= src.RutaESP,
			RutaENG= src.RutaENG,
			DireccionESP= src.DireccionESP,
			DireccionENG= src.DireccionENG,
			Horario= src.Horario,
			FechaModificacion = GETDATE(),
			ModificadoPor =@Usuario
    WHEN NOT MATCHED THEN  
        INSERT (
			NombreSitioTuristicoESP,
			NombreSitioTuristicoENG,
			IdMunicipio,
			Latitud,
			Longitud,
			Altitud, 
			IconoMarcador, 
			Activo,
			DescripcionESP,
			DescripcionENG, 
			PresentacionESP,
			PresentacionENG,
			RutaESP,
			RutaENG,
			IdTipoSitioTuristico,
			DireccionESP,
			DireccionENG,
			Horario)  
        VALUES (
			src.NombreSitioTuristicoESP,
			src.NombreSitioTuristicoENG, 
			src.IdMunicipio,
			src.Latitud,
			src.Longitud,
			src.Altitud,
			src.IconoMarcador,
			src.Activo,
			src.DescripcionESP, 
			src.DescripcionENG,
			src.PresentacionESP,
			src.PresentacionENG,
			src.RutaESP, 
			src.RutaENG,
			@IdTipoSitioTuristico,
			src.DireccionESP,
			src.DireccionENG,
			src.Horario)
		OUTPUT $action INTO #Action;

	SELECT IdSitioTuristico
	FROM tblSitioTuristico  
	WHERE IdSitioTuristico =IIF(@IdSitioTuristico IS NULL, SCOPE_IDENTITY(),@IdSitioTuristico)

	DROP TABLE IF EXISTS #TempSitioTuristico;

END