CREATE PROCEDURE dbo.[GuardarSitiosTuristicos] (@jsonSitioTuristico NVARCHAR(MAX),@jsonHorarios NVARCHAR(MAX),@CodigoTipoSitio VARCHAR(20),@Usuario VARCHAR(100),@IdSitioTuristico INT = NULL)
AS 
BEGIN
	DECLARE @IdTipoSitioTuristico INT = (SELECT TOP 1 IdTipoSitioTuristico FROM tblTipoSitioTuristico WHERE Codigo  = @CodigoTipoSitio)
	CREATE TABLE #Action ([Accion] VARCHAR(20))
	DECLARE @IdentityHorario TABLE (IdHorario INT,IdDiaSemana INT, [Action] VARCHAR(100))

	SELECT IdSitioTuristico,NombreSitioTuristicoESP, NombreSitioTuristicoENG, IdMunicipio, Latitud, Longitud,IconoMarcador, Activo, DescripcionESP, DescripcionENG, PresentacionESP, PresentacionENG, RutaESP, RutaENG, DireccionESP, DireccionENG
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
		DescripcionESP VARCHAR(MAX) 'strict $.PresentacionESP',
		DescripcionENG VARCHAR(MAX) 'strict $.DescripcionENG',
		PresentacionESP VARCHAR(MAX) 'strict $.PresentacionESP',
		PresentacionENG VARCHAR(MAX) 'strict $.PresentacionENG',
		RutaESP VARCHAR(MAX) 'strict $.RutaESP',
		RutaENG VARCHAR(MAX) 'strict $.RutaENG',
		DireccionESP VARCHAR(MAX) 'strict $.DireccionESP',
		DireccionENG VARCHAR(MAX) 'strict $.DireccionENG' );

    SELECT IdHorario,IdSitioTuristico,IdDiaSemana,NombreDia, Horas
	INTO #TempHorarios 
    FROM 	OPENJSON( @jsonHorarios) 
    WITH (IdHorario INT '$.IdHorario',IdSitioTuristico INT '$.IdSitioTuristico',IdDiaSemana INT '$.IdDiaSemana',NombreDia NVARCHAR(100) '$.NombreDia', Horas NVARCHAR(MAX) '$.Horas');

    MERGE tblSitioTuristico AS tgt  
    USING (SELECT IdSitioTuristico,NombreSitioTuristicoESP,NombreSitioTuristicoENG,IdMunicipio, Latitud,Longitud, NULL AS Altitud, IconoMarcador, Activo, DescripcionESP, DescripcionENG, PresentacionESP, PresentacionENG,RutaESP, RutaENG, DireccionESP, DireccionENG
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
			DireccionENG= src.DireccionENG
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
			DireccionENG)  
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
			src.DireccionENG)
		OUTPUT $action INTO #Action;

	IF EXISTS (SELECT Accion FROM #Action WHERE Accion = 'INSERT') BEGIN 
		SET @IdSitioTuristico  = (SELECT SCOPE_IDENTITY());
		UPDATE #TempHorarios SET IdSitioTuristico = @IdSitioTuristico
	END

	MERGE tblHorarios AS tgt  
    USING (SELECT IdDiaSemana, IdHorario, Horas
	FROM #TempHorarios) AS src 
    ON (tgt.IdHorario = src.IdHorario)  
    WHEN MATCHED THEN
        UPDATE SET 
			Horario= src.Horas
    WHEN NOT MATCHED THEN  
        INSERT (
			Horario,
			IdSitioTuristico)  
        VALUES (
			src.Horas,
			@IdSitioTuristico)
	OUTPUT Inserted.IdHorario,src.IdDiaSemana,$action INTO @IdentityHorario;

	IF EXISTS (SELECT [Action] FROM @IdentityHorario WHERE [Action] = 'INSERT') BEGIN 
		UPDATE #TempHorarios SET IdHorario = IdentityHorario.IdHorario
		FROM @IdentityHorario AS IdentityHorario WHERE #TempHorarios.IdDiaSemana = IdentityHorario.IdDiaSemana
	END

	MERGE tblDiaHorarioSitioTuristico AS tgt  
    USING (SELECT IdHorario,IdDiaSemana, Horas
	FROM #TempHorarios) AS src 
    ON (tgt.IdHorario = src.IdHorario AND tgt.IdDiaSemana = src.IdDiaSemana)  
    WHEN NOT MATCHED THEN  
        INSERT (
			IdHorario,
			IdDiaSemana)  
        VALUES (
			src.IdHorario,
			src.IdDiaSemana);

	DROP TABLE IF EXISTS #TempSitioTuristico;
	DROP TABLE IF EXISTS #TempHorarios;
	DROP TABLE IF EXISTS #Action;

	SELECT @IdSitioTuristico AS IdSitioTuristico
END