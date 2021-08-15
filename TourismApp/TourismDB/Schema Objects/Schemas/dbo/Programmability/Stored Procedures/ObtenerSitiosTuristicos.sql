CREATE PROCEDURE [dbo].[ObtenerSitiosTuristicos]
	@IdMunicipio INT
AS BEGIN
	SELECT st.IdSitioTuristico, ist.Titulo, ISNULL(TituloENG, ist.Titulo) AS TituloENG, st.NombreSitioTuristicoESP, st.IdMunicipio, st.Latitud, st.Longitud, ist.DescripcionESP, ISNULL(ist.DescripcionENG, ist.DescripcionESP) AS DescripcionENG, ist.Imagen, ist.Orden, st.IconoMarcador
	FROM tblSitioTuristico AS st
	LEFT JOIN tblInfoSitioTuristico AS ist ON st.IdSitioTuristico = ist.IdSitioTuristico
	WHERE IdMunicipio = @IdMunicipio
END
