CREATE PROCEDURE [dbo].[ObtenerSitiosTuristicos]
	@IdMunicipio INT
AS BEGIN
	SELECT st.IdSitioTuristico, ist.Titulo, st.NombreSitioTuristicoESP, st.IdMunicipio, st.Latitud, st.Longitud, ist.DescripcionESP, ist.DescripcionENG, ist.Imagen, ist.Orden
	FROM tblSitioTuristico AS st
	LEFT JOIN tblInfoSitioTuristico AS ist ON st.IdSitioTuristico = ist.IdSitioTuristico
	WHERE IdMunicipio = @IdMunicipio
END
