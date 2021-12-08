CREATE PROCEDURE [dbo].[ObtenerPuntosSenderismo]	
	@IdSitioTuristico INT
AS
BEGIN
	SELECT Latitud, Longitud, Altitud, Orden, TimeRec
	FROM tblPuntoSenderismo WHERE IdSitioTuristico = @IdSitioTuristico
	FOR JSON AUTO;
END