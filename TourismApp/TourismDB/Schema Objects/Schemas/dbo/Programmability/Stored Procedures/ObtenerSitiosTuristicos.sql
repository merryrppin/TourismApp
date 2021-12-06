CREATE PROCEDURE [ObtenerSitiosTuristicos] (@IdMunicipio INT = -1,@CodigoTipoSitio VARCHAR(10) = NULL)
AS BEGIN

	DECLARE @SQL nvarchar(MAX)

	SET @SQL = N'
			SELECT
				sitioT.IdSitioTuristico,
				sitioT.NombreSitioTuristicoESP,
				sitioT.NombreSitioTuristicoENG,
				sitioT.IdMunicipio,
				sitioT.Latitud,
				sitioT.Longitud,
				sitioT.Altitud,
				sitioT.IconoMarcador,
				sitioT.Activo,
				sitioT.DescripcionESP,
				sitioT.DescripcionENG,
				sitioT.PresentacionESP,
				sitioT.PresentacionENG,
				sitioT.RutaESP,
				sitioT.RutaENG,
				sitioT.IdTipoSitioTuristico,
				tipoSitio.Nombre
			FROM tblSitioTuristico AS sitioT
				INNER JOIN tblTipoSitioTuristico AS tipoSitio ON sitioT.IdTipoSitioTuristico = tipoSitio.IdTipoSitioTuristico
			WHERE 1 = 1 '

	IF  @CodigoTipoSitio IS NOT NULL
	BEGIN
		SET @SQL+=	' AND tipoSitio.Codigo = @CodigoTipoSitio '
	END

	IF  @IdMunicipio != -1
	BEGIN
		SET @SQL+=	' AND sitioT.IdMunicipio = @IdMunicipio '
	END

	EXEC sp_executesql @SQL, N'@CodigoTipoSitio VARCHAR(10), @IdMunicipio INT', @CodigoTipoSitio = @CodigoTipoSitio, @IdMunicipio = @IdMunicipio; 
END