CREATE PROCEDURE [dbo].[ObtenerPuntosSenderismo]	
	@IdSitioTuristico INT
AS
BEGIN
	SELECT Latitud, Longitud, Altitud, Orden, TimeRec
	FROM tblPuntoSenderismo WHERE IdSitioTuristico = @IdSitioTuristico
	FOR JSON AUTO;

	SELECT MAX(Latitud), MIN(Latitud), MAX(Longitud), MIN (Longitud) 
	FROM tblPuntoSenderismo 
	WHERE IdSitioTuristico = @IdSitioTuristico;

	SELECT Latitud, Longitud, Altitud, Orden, TimeRec, NombrePunto, NombrePuntoENG, DescripcionPunto, DescripcionPuntoENG, FotoPrincipal, Cmt
	FROM [tblPuntoReferencia] WHERE IdSitioTuristico = @IdSitioTuristico
	FOR JSON AUTO;

	SELECT MAX(Latitud), MIN(Latitud), MAX(Longitud), MIN (Longitud) 
	FROM [tblPuntoReferencia] 
	WHERE IdSitioTuristico = @IdSitioTuristico;
END