CREATE PROCEDURE [dbo].[ObtenerSitiosTuristicos]
	@IdMunicipio INT
AS BEGIN
	SELECT st.IdSitioTuristico, st.NombreSitioTuristicoESP, st.IdMunicipio, st.Latitud, st.Longitud, ist.DescripcionESP, ist.DescripcionENG, ist.Imagen
	FROM tblSitioTuristico AS st
	LEFT JOIN tblInfoSitioTuristico AS ist ON st.IdSitioTuristico = ist.IdSitioTuristico
	WHERE IdMunicipio = @IdMunicipio
END
