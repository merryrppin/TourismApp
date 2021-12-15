CREATE PROCEDURE dbo.[GuardarSitiosTuristicos] (@jsonSitioTuristico NVARCHAR(MAX),@jsonHorarios NVARCHAR(MAX),@CodigoTipoSitio VARCHAR(20),@Usuario VARCHAR(100),@IdSitioTuristico INT = NULL)
AS 
BEGIN
	DECLARE @IdTipoSitioTuristico INT = (SELECT TOP 1 IdTipoSitioTuristico FROM tblTipoSitioTuristico WHERE Codigo  = @CodigoTipoSitio)
	CREATE TABLE #Action ([Accion] VARCHAR(20))
	DECLARE @IdentityHorario TABLE (IdHorario INT,Horas VARCHAR(MAX), [Action] VARCHAR(100))

	SELECT IdSitioTuristico,NombreSitioTuristicoESP, NombreSitioTuristicoENG, IdMunicipio, Latitud, Longitud,IconoMarcador, Activo, DescripcionESP, DescripcionENG, PresentacionESP, PresentacionENG, RutaESP, RutaENG, DireccionESP, DireccionENG, Imperdible
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
		Imperdible BIT 'strict $.Imperdible');

    SELECT IdHorario,IdSitioTuristico,IdDiaSemana,NombreDia, Horas
	INTO #TempHorarios 
    FROM 	OPENJSON( @jsonHorarios) 
    WITH (IdHorario INT '$.IdHorario',IdSitioTuristico INT '$.IdSitioTuristico',IdDiaSemana INT '$.IdDiaSemana',NombreDia NVARCHAR(100) '$.NombreDia', Horas NVARCHAR(MAX) '$.Horas');

    MERGE tblSitioTuristico AS tgt  
    USING (SELECT IdSitioTuristico,NombreSitioTuristicoESP,NombreSitioTuristicoENG,IdMunicipio, Latitud,Longitud, NULL AS Altitud, IconoMarcador, Activo, DescripcionESP, DescripcionENG, PresentacionESP, PresentacionENG,RutaESP, RutaENG, DireccionESP, DireccionENG, Imperdible
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
			Imperdible= src.Imperdible,
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
			Imperdible)  
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
			src.Imperdible)
		OUTPUT $action INTO #Action;

	IF EXISTS (SELECT Accion FROM #Action WHERE Accion = 'INSERT') BEGIN 
		SET @IdSitioTuristico  = (SELECT SCOPE_IDENTITY());
		UPDATE #TempHorarios SET IdSitioTuristico = @IdSitioTuristico
	END

	MERGE tblHorarios AS tgt  
    USING (SELECT DISTINCT  IdHorario,IdSitioTuristico, Horas
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
			src.IdSitioTuristico)
	OUTPUT Inserted.IdHorario,src.Horas,$action INTO @IdentityHorario;

	IF EXISTS (SELECT [Action] FROM @IdentityHorario WHERE [Action] = 'INSERT') BEGIN 
		UPDATE #TempHorarios SET IdHorario = IdentityHorario.IdHorario
		FROM @IdentityHorario AS IdentityHorario WHERE #TempHorarios.Horas = IdentityHorario.Horas
	END

	MERGE tblDiaHorarioSitioTuristico AS tgt  
    USING (SELECT IdHorario,IdDiaSemana
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

	SELECT sitioT.IdSitioTuristico, tblHorarios.IdHorario,tblHorarios.Horario,tblDiaSemana.NombreDiaESP,diaHorario.IdDiaSemana
	FROM tblDiaHorarioSitioTuristico diaHorario
		INNER JOIN tblHorarios ON diaHorario.IdHorario = tblHorarios.IdHorario
		INNER JOIN tblDiaSemana ON diaHorario.IdDiaSemana = tblDiaSemana.IdDiaSemana
		INNER JOIN tblSitioTuristico AS sitioT ON tblHorarios.IdSitioTuristico = sitioT.IdSitioTuristico
	WHERE sitioT.IdSitioTuristico = @IdSitioTuristico

END