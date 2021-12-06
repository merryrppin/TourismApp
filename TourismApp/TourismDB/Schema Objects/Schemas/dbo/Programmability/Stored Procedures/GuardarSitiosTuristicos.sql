CREATE PROCEDURE dbo.[GuardarSitiosTuristicos] (@jsonSitioTuristico NVARCHAR(MAX),@jsonHorarios NVARCHAR(MAX),@jsonFotos NVARCHAR(MAX),@CodigoTipoSitio VARCHAR(20),@Usuario VARCHAR(100))
AS 
BEGIN
	DECLARE @IdTipoSitioTuristico INT = (SELECT TOP 1 IdTipoSitioTuristico FROM tblTipoSitioTuristico WHERE Codigo  = @CodigoTipoSitio)

	SELECT IdSitioTuristico,NombreSitioTuristicoESP, NombreSitioTuristicoENG, IdMunicipio, Latitud, Longitud,IconoMarcador, Activo, DescripcionESP, DescripcionENG, PresentacionESP, PresentacionENG, RutaESP, RutaENG
	INTO #TempSitioTuristico 
	FROM OPENJSON(@jsonSitioTuristico)
	  WITH (
		IdSitioTuristico INT 'strict $.IdSitioTuristico',
		NombreSitioTuristicoESP VARCHAR(MAX) 'strict $.NombreSitioTuristicoESP',
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
		RutaENG VARCHAR(MAX) 'strict $.RutaENG'
	  );

    SELECT IdHorario,IdSitioTuristico,IdDiaSemana,NombreDia, Horas
	INTO #TempHorarios 
    FROM 	OPENJSON( @jsonHorarios, '$.Horario' ) 
    WITH (IdHorario INT '$.IdHorario',IdSitioTuristico INT '$.IdSitioTuristico',IdDiaSemana INT '$.IdDiaSemana',NombreDia NVARCHAR(25) '$.NombreDia', Horas NVARCHAR(25) '$.Horas');

    SELECT IdSitioTuristico,IdGaleriaFoto,Nombre,UrlFoto
	INTO #TempGaleriaFotos
    FROM OPENJSON( @jsonFotos, '$.Galeria' ) 
    WITH (IdSitioTuristico INT '$.IdSitioTuristico',IdGaleriaFoto INT '$.IdGaleriaFoto',Nombre NVARCHAR(500) '$.Nombre', UrlFoto NVARCHAR(1000) '$.UrlFoto');


    MERGE tblSitioTuristico AS tgt  
    USING (SELECT IdSitioTuristico,NombreSitioTuristicoESP,NombreSitioTuristicoENG,IdMunicipio, Latitud,Longitud, NULL AS Altitud, IconoMarcador, Activo, DescripcionESP, DescripcionENG, PresentacionESP, PresentacionENG,RutaESP, RutaENG
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
			RutaENG= src.RutaENG
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
			IdTipoSitioTuristico)  
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
			@IdTipoSitioTuristico)
    OUTPUT  $action;

	MERGE tblHorarios AS tgt  
    USING (SELECT IdHorario, IdSitioTuristico,Horas
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
			src.IdSitioTuristico);

	MERGE tblDiaHorarioSitioTuristico AS tgt  
    USING (SELECT IdHorario,IdDiaSemana, IdSitioTuristico,Horas
	FROM #TempHorarios) AS src 
    ON (tgt.IdHorario = src.IdHorario AND tgt.IdDiaSemana = src.IdDiaSemana)  
    WHEN NOT MATCHED THEN  
        INSERT (
			IdHorario,
			IdDiaSemana)  
        VALUES (
			src.IdHorario,
			src.IdDiaSemana);

	MERGE tblGaleriaFotos AS tgt  
    USING (SELECT IdGaleriaFoto,IdSitioTuristico, Nombre, UrlFoto
	FROM #TempGaleriaFotos) AS src 
    ON (tgt.IdGaleriaFotosST = src.IdGaleriaFoto)  
    WHEN NOT MATCHED THEN  
        INSERT (
			IdSitioTuristico,
			UrlFoto)  
        VALUES (
			src.IdSitioTuristico,
			src.Nombre);


	DROP TABLE IF EXISTS #TempGaleriaFotos;
	DROP TABLE IF EXISTS #TempSitioTuristico;
	DROP TABLE IF EXISTS #TempHorarios;

END