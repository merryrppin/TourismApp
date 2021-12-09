CREATE PROCEDURE [dbo].[ObtenerPuntosSenderismo]	
	@IdSitioTuristico INT
AS
BEGIN
	SELECT Latitud, Longitud, Altitud, Orden, TimeRec
	FROM tblPuntoSenderismo 
	WHERE IdSitioTuristico = @IdSitioTuristico
	ORDER BY Orden;

	SELECT MAX(Latitud) AS MaxLatitud, MIN(Latitud) AS MinLatitud, MAX(Longitud) AS MaxLongitud, MIN (Longitud) AS MinLongitud
	FROM tblPuntoSenderismo 
	WHERE IdSitioTuristico = @IdSitioTuristico;

	SELECT Latitud, Longitud, Altitud, Orden, TimeRec, NombrePunto, NombrePuntoENG, DescripcionPunto, DescripcionPuntoENG, FotoPrincipal, Cmt
	FROM [tblPuntoReferencia] 
	WHERE IdSitioTuristico = @IdSitioTuristico
	ORDER BY Orden;

	SELECT MAX(Latitud) AS MaxLatitud, MIN(Latitud) AS MinLatitud, MAX(Longitud) AS MaxLongitud, MIN (Longitud) AS MinLongitud
	FROM [tblPuntoReferencia] 
	WHERE IdSitioTuristico = @IdSitioTuristico;
END