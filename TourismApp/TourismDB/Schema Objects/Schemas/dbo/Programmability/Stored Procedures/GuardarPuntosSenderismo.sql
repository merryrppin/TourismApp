CREATE PROCEDURE [dbo].[GuardarPuntosSenderismo]
	@jsonTrkSeg VARCHAR(MAX),
	@IdSitioTuristico INT
AS
BEGIN
	CREATE TABLE #tmpPuntos(Position INT, Latitude DECIMAL(8, 6), Longitude DECIMAL(9, 6), Elevation VARCHAR(20), TimeRec VARCHAR(50));
	
	INSERT INTO #tmpPuntos(Position, Latitude, Longitude, Elevation, TimeRec)
	SELECT ROW_NUMBER() OVER(ORDER BY (SELECT NULL)) AS Position, Latitude, Longitude, Elevation, TimeRec
	FROM OPENJSON (@jsonTrkSeg)  
	WITH (
		Latitude DECIMAL(8, 6) '$.Latitude', 
		Longitude DECIMAL(9, 6) '$.Longitude', 
		Elevation VARCHAR(20) '$.Elevation', 
		TimeRec VARCHAR(50) '$.TimeRec'
	);
	 
	
	BEGIN TRY  
		BEGIN TRANSACTION
		
		DELETE FROM tblPuntoSenderismo WHERE IdSitioTuristico = @IdSitioTuristico;
		
		INSERT INTO tblPuntoSenderismo([Latitud], [Longitud], [Altitud], [IdSitioTuristico], [Orden], [TimeRec])
		SELECT Latitude, Longitude, Elevation, @IdSitioTuristico, Position, TimeRec
		FROM #tmpPuntos;
		
		COMMIT TRANSACTION
		SELECT 1;
	END TRY  
	BEGIN CATCH  
		SELECT ERROR_MESSAGE();
		ROLLBACK TRANSACTION
	END CATCH
	
	DROP TABLE IF EXISTS #tmpPuntos;
END
