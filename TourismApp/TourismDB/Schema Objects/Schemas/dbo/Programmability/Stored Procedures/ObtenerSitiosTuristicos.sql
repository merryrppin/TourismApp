CREATE PROCEDURE [dbo].[ObtenerSitiosTuristicos]
	@IdMunicipio INT
AS BEGIN
	SELECT IdSitioTuristico, NombreSitioTuristicoESP, IdMunicipio, Latitud, Longitud
	FROM tblSitioTuristico WHERE IdMunicipio = @IdMunicipio
END
