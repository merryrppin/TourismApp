CREATE PROCEDURE [dbo].[GuardarPuntosSenderismo]
	@jsonTrkSeg VARCHAR(MAX),
	@jsonWptGPX VARCHAR(MAX),	
	@IdSitioTuristico INT
AS
BEGIN
	CREATE TABLE #tmpPuntos(Position INT, Latitude DECIMAL(8, 6), Longitude DECIMAL(9, 6), Elevation VARCHAR(20), TimeRec VARCHAR(50));
	CREATE TABLE #tmpPuntosReferencia(Position INT, Latitude DECIMAL(8, 6), Longitude DECIMAL(9, 6), Elevation VARCHAR(20), TimeRec VARCHAR(50), [Name] VARCHAR(500), Cmt VARCHAR(500), [Description] VARCHAR(MAX));
	
	INSERT INTO #tmpPuntos(Position, Latitude, Longitude, Elevation, TimeRec)
	SELECT ROW_NUMBER() OVER(ORDER BY (SELECT NULL)) AS Position, Latitude, Longitude, Elevation, TimeRec
	FROM OPENJSON (@jsonTrkSeg)  
	WITH (
		Latitude DECIMAL(8, 6) '$.Latitude', 
		Longitude DECIMAL(9, 6) '$.Longitude', 
		Elevation VARCHAR(20) '$.Elevation', 
		TimeRec VARCHAR(50) '$.TimeRec'
	);
	
	INSERT INTO #tmpPuntosReferencia(Position, Latitude, Longitude, Elevation, TimeRec, [Name], Cmt, [Description])
	SELECT ROW_NUMBER() OVER(ORDER BY (SELECT NULL)) AS Position, Latitude, Longitude, Elevation, TimeRec, [Name], Cmt, [Description]
	FROM OPENJSON (@jsonWptGPX)  
	WITH (
		Latitude DECIMAL(8, 6) '$.Latitude', 
		Longitude DECIMAL(9, 6) '$.Longitude', 
		Elevation VARCHAR(20) '$.Elevation', 
		TimeRec VARCHAR(50) '$.TimeRec',
		[Name] VARCHAR(50) '$.Name',
		Cmt VARCHAR(50) '$.Cmt',
		[Description] VARCHAR(50) '$.Description'
	);

	BEGIN TRY  
		BEGIN TRANSACTION
		
		DELETE FROM tblPuntoSenderismo WHERE IdSitioTuristico = @IdSitioTuristico;
		
		INSERT INTO tblPuntoSenderismo([Latitud], [Longitud], [Altitud], [IdSitioTuristico], [Orden], [TimeRec])
		SELECT Latitude, Longitude, Elevation, @IdSitioTuristico, Position, TimeRec
		FROM #tmpPuntos;
		
		DELETE FROM [tblPuntoReferencia] WHERE IdSitioTuristico = @IdSitioTuristico;
		
		INSERT INTO tblPuntoReferencia([IdSitioTuristico], [Latitud], [Longitud], [Altitud], [TimeRec], [NombrePunto], [DescripcionPunto], [Cmt], [Orden])
		SELECT @IdSitioTuristico, Latitude, Longitude, Elevation, TimeRec, [Name], [Description], Cmt, Position
		FROM #tmpPuntosReferencia;
		
		COMMIT TRANSACTION
		SELECT 1;
	END TRY  
	BEGIN CATCH  
		SELECT ERROR_MESSAGE();
		ROLLBACK TRANSACTION
	END CATCH
	
	DROP TABLE IF EXISTS #tmpPuntos;
	DROP TABLE IF EXISTS #tmpPuntosReferencia;
END
